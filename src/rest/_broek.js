const Router = require('@koa/router');

const Role = require('../core/roles');
const broekService = require('../service/broek');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const getAllBroeken = async (ctx) => {
  ctx.body = await broekService.getAll();
};

const getBroekByName = async (ctx) => {
  ctx.body = await broekService.getByName(ctx.params.name);
};

const getBroekById = async (ctx) => {
  ctx.body = await broekService.getById(ctx.params.id);
};

const createBroek = async (ctx) => {
  const newBroek = await broekService.create({
    ...ctx.request.body,
  });
  ctx.body = newBroek;
  ctx.status=201;
};


const getBroekBySize = async (ctx) => {
  ctx.body = await broekService.getBySize(ctx.params.size);
};



const updateBroek = async (ctx) => {
  ctx.body = await broekService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};


const deleteBroek = async (ctx) => {
  broekService.deleteById(ctx.params.id);
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
  router.get('/id/:id', getBroekById);
  router.get('/size/:size', getBroekBySize);
  router.get('/name/:name', getBroekByName);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  //private routes
  router.post('/',requireAuthentication, requireAdmin, createBroek);
  router.put('/:id',requireAuthentication, requireAdmin, updateBroek);
  router.delete('/:id',requireAuthentication, requireAdmin, deleteBroek);

  app.use(router.routes()).use(router.allowedMethods());
};