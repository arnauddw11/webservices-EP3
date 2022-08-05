const Router = require('@koa/router');

const Role = require('../core/roles');
const bovenstukService = require('../service/bovenstuk');
const { requireAuthentication, makeRequireRole } = require('../core/auth');


const getAllBovenstukken = async (ctx) => {
  ctx.body = await bovenstukService.getAll();
};

const getBovenstukByName = async (ctx) => {
  ctx.body = await bovenstukService.getByName(ctx.params.name);
};

const getBovenstukById = async (ctx) => {
  ctx.body = await bovenstukService.getById(ctx.params.id);
};

const createBovenstuk = async (ctx) => {
  const newBovenstuk = await bovenstukService.create({
    ...ctx.request.body,
  });
  ctx.body = newBovenstuk;
  ctx.status=201;
};


const getBovenstukBySize = async (ctx) => {
  ctx.body = await bovenstukService.getBovenstukBySize(ctx.params.size);
};



const updateBovenstuk = async (ctx) => {
  ctx.body = await bovenstukService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};


const deleteBovenstuk = async (ctx) => {
  bovenstukService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/bovenstuk',
  });
  //publieke routes
  router.get('/', getAllBovenstukken);
  router.get('/id/:id', getBovenstukById);
  router.get('/size/:size', getBovenstukBySize);
  router.get('/name/name', getBovenstukByName);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  //private routes
  router.post('/',requireAuthentication, requireAdmin, createBovenstuk);
  router.put('/:id',requireAuthentication, requireAdmin, updateBovenstuk);
  router.delete('/:id',requireAuthentication, requireAdmin, deleteBovenstuk);

  app.use(router.routes()).use(router.allowedMethods());
};