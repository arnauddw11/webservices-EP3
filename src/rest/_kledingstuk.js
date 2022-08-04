const Router = require('@koa/router');
const kledingstukService = require('../service/kledingstuk');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const getAllKledingstukken = async (ctx) => {
	console.log(1)
	ctx.body = await kledingstukService.getAll();
};

const createKledingstuk = async (ctx) => {
	const newKledingstuk = await kledingstukService.create({
		...ctx.request.body,
	});
	ctx.body = newKledingstuk;
	ctx.status=201;
};


const getKledingstukByName = async (ctx) => {
	ctx.body = await kledingstukService.getByName(ctx.params.name);
};

 const getKledingsukById = async (ctx) => {
	ctx.body = await kledingstukService.getById(ctx.params.id);
};


const updateKledingstuk = async (ctx) => {
	ctx.body = await kledingstukService.updateById(ctx.params.id, {
		...ctx.request.body,
	});
	ctx.status = 200;
};


const deleteKledingstuk = async (ctx) => {
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
		prefix: '/kledingstuk',
	});
//publieke routes
	router.get('/', getAllKledingstukken);
	router.get('/:id', getKledingsukById);
	router.get('/name/:name', getKledingstukByName);
//private routes
	router.post('/',requireAuthentication, createKledingstuk);
	router.put('/:id',requireAuthentication, updateKledingstuk);
	router.delete('/:id',requireAuthentication, deleteKledingstuk);

	app.use(router.routes()).use(router.allowedMethods());
};