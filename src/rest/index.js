const Router = require('@koa/router');

const installBovenstukRouter = require('./_bovenstuk');
const installBroekRouter = require('./_broek');
const installHealthRouter = require('./_health');
const installKledingstukRouter = require('./_kledingstuk');
const installSchoenRouter = require('./_schoen');
const installUserRouter = require('./_user');
const installValidationRouter = require('./_validation');


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installBovenstukRouter(router);
  installBroekRouter(router);
  installHealthRouter(router);
  installKledingstukRouter(router);
  installSchoenRouter(router);
  installUserRouter(router);
  installValidationRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};