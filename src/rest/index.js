const Router = require('@koa/router');

const installBovenstukRouter = require('./_bovenstuk');
const installBroekRouter = require('./_broek');
const installHealthRouter = require('./_health');
const installSchoenRouter = require('./_schoen');
const installOutfitRouter = require('./_outfit');
const installUserRouter = require('./_user');
const installValidationRouter = require('./_validation');
/**
 * @swagger
 * components:
 *   schemas:
 *     Base:
 *       required:
 *         - _id
  *       properties:
 *         _id:
 *           type: string
 *           format: "ObjectId"
 *       example:
 *         _id: "62f0ef08c42d98f6f92358e3"
 *     
 *     User:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: "string"
 *             email:
 *               type: "string"
 *               format: email
 *           example:
 *             $ref: "#/components/examples/User"
 *   examples:
 *     User:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       name: "Arnaud dw"
 *       email: "arnaud.dw@kledingapp.be"
 */

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
  installSchoenRouter(router);
  installOutfitRouter(router);
  installUserRouter(router);
  installValidationRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};