const Router = require('@koa/router');

const Role = require('../core/roles');
const schoenService = require('../service/schoen');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const getAllSchoenen = async (ctx) => {
  ctx.body = await schoenService.getAll();
};

const getSchoenByName = async (ctx) => {
  ctx.body = await schoenService.getByName(ctx.params.name);
};

const getSchoenById = async (ctx) => {
  ctx.body = await schoenService.getById(ctx.params.id);
};

const createSchoen = async (ctx) => {
  const newSchoen = await schoenService.create({
    ...ctx.request.body,
  });
  ctx.body = newSchoen;
  ctx.status=201;
};


const getSchoenBySize = async (ctx) => {
  ctx.body = await schoenService.getBySize(ctx.params.size);
};



const updateSchoen = async (ctx) => {
  ctx.body = await schoenService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};


const deleteSchoen = async (ctx) => {
  schoenService.deleteById(ctx.params.id);
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
  router.get('/id/:id', getSchoenById);
  router.get('/size/:size', getSchoenBySize);
  router.get('/name/:name', getSchoenByName);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  //private routes
  router.post('/',requireAuthentication, requireAdmin, createSchoen);
  router.put('/:id',requireAuthentication, requireAdmin, updateSchoen);
  router.delete('/:id',requireAuthentication, requireAdmin, deleteSchoen);

  app.use(router.routes()).use(router.allowedMethods());
};