const Router = require('@koa/router');
const outfitService = require('../service/outfit');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const getAllOutfits = async (ctx) => {
	ctx.body = await outfitService.getAll();
};

const getOutfitById = async (ctx) => {
	ctx.body = await outfitService.getById(ctx.params.id);
};

const createOutfit = async (ctx) => {
	const newOutfit = await outfitService.create({
		...ctx.request.body,
	});
	ctx.body = newOutfit;
	ctx.status=201;
};

const updateOutfit = async (ctx) => {
	ctx.body = await outfitService.updateById(ctx.params.id, {
		...ctx.request.body,
	});
	ctx.status = 200;
};


const deleteOutfit = async (ctx) => {
	outfitService.deleteById(ctx.params.id);
	ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/outfit',
	});
//publieke routes
	router.get('/', getAllOutfits);
	router.get('/id/:id', getOutfitById);
//private routes
	router.post('/',requireAuthentication, createOutfit);
	router.put('/:id',requireAuthentication, updateOutfit);
	router.delete('/:id',requireAuthentication, deleteOutfit);

	app.use(router.routes()).use(router.allowedMethods());
};