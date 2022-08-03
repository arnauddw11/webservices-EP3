const Router = require('@koa/router');
const schoenService = require('../service/schoen');
const kledingstukService = require('../service/kledingstuk');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const getAllSchoenen = async (ctx) => {
	ctx.body = await kledingstukService.getAll();
};

const getSchoenByName = async (ctx) => {
	ctx.body = await kledingstukService.getByName(ctx.params.name);
};

const getSchoenById = async (ctx) => {
	ctx.body = await kledingstukService.getById(ctx.params.id);
};

const createSchoen = async (ctx) => {
	const newSchoen = await schoenService.create({
		...ctx.request.body,
	});
	ctx.body = newSchoen;
	ctx.status=201;
};


const getSchoenBySize = async (ctx) => {
	ctx.body = await schoenService.getSchoenBySize(ctx.params.size);
};



const updateSchoen = async (ctx) => {
	ctx.body = await schoenService.updateById(ctx.params.id, {
		...ctx.request.body,
	});
	ctx.status = 200;
};


const deleteSchoen = async (ctx) => {
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
		prefix: '/schoen',
	});
//publieke routes
	router.get('/', getAllSchoenen);
	router.get('/:id', getSchoenById);
  router.get('/:size', getSchoenBySize);
  router.get('/name', getSchoenByName)
//private routes
	router.post('/',requireAuthentication, createSchoen);
	router.put('/:id',requireAuthentication, updateSchoen);
	router.delete('/:id',requireAuthentication, deleteSchoen);

	app.use(router.routes()).use(router.allowedMethods());
};