const Router = require('@koa/router');
const broekService = require('../service/broek');
const kledingstukService = require('../service/kledingstuk');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const getAllBroeken = async (ctx) => {
	ctx.body = await kledingstukService.getAll();
};

const getBroekByName = async (ctx) => {
	ctx.body = await kledingstukService.getByName(ctx.params.name);
};

const getBroekById = async (ctx) => {
	ctx.body = await kledingstukService.getById(ctx.params.id);
};

const createBroek = async (ctx) => {
	const newBroek = await broekService.create({
		...ctx.request.body,
	});
	ctx.body = newBroek;
	ctx.status=201;
};


const getBroekBySize = async (ctx) => {
	ctx.body = await broekService.getBroekBySize(ctx.params.size);
};



const updateBroek = async (ctx) => {
	ctx.body = await broekService.updateById(ctx.params.id, {
		...ctx.request.body,
	});
	ctx.status = 200;
};


const deleteBroek = async (ctx) => {
	kledingstukService.deleteById(ctx.params.id);
	ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/broek',
	});
//publieke routes
	router.get('/', getAllBroeken);
	router.get('/:id', getBroekById);
  router.get('/:size', getBroekBySize);
  router.get('/name', getBroekByName)
//private routes
	router.post('/',requireAuthentication, createBroek);
	router.put('/:id',requireAuthentication, updateBroek);
	router.delete('/:id',requireAuthentication, deleteBroek);

	app.use(router.routes()).use(router.allowedMethods());
};