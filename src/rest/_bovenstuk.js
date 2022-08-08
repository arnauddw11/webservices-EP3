const Router = require('@koa/router');

const Role = require('../core/roles');
const bovenstukService = require('../service/bovenstuk');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

/**
 * @swagger
 * tags:
 *   name: Bovenstuks
 *   description: Represents a Represents a garment worn as an upper garment
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Bovenstuks:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - name
 *             - dropdate
 *             - size
 *           properties:
 *             name:
 *               type: "string"
 *             dropdate:
 *               type: "string"
 *               format: date-time
 *             size:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Bovenstuk"
 *   examples:
 *     Bovenstuk:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       name: "Adidas performance tshirt"
 *       dropdate: "2021-05-28T14:27:32.534Z"
 *       size: "M"
 */

/**
 * @swagger
 * /api/bovenstuk:
 *   get:
 *     summary: Get all bovenstuks
 *     tags:
 *     - Bovenstuk
 */
const getAllBovenstukken = async (ctx) => {
  ctx.body = await bovenstukService.getAll();
};
/**
 * @swagger
 * /api/bovenstuk:
 *   get:
 *     summary: Get bovenstuk by Name
 *     tags:
 *     - Bovenstuk
 */
const getBovenstukByName = async (ctx) => {
  ctx.body = await bovenstukService.getByName(ctx.params.name);
};
/**
 * @swagger
 * /api/bovenstuk:
 *   get:
 *     summary: Get bovenstuk by id
 *     tags:
 *     - Bovenstuk
 */
const getBovenstukById = async (ctx) => {
  ctx.body = await bovenstukService.getById(ctx.params.id);
};
/**
 * @swagger
 * /api/bovenstuk:
 *   post:
 *     summary: Create a new bovenstuk
 *     description: Creates a new bovenstuk for the signed in user.
 *     tags:
 *      - Bovenstuk
 
 *     responses:
 *       200:
 *         description: The created bovenstuk
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Bovenstuk"
 * */
const createBovenstuk = async (ctx) => {
  const newBovenstuk = await bovenstukService.create({
    ...ctx.request.body,
  });
  ctx.body = newBovenstuk;
  ctx.status=201;
};

/**
 * @swagger
 * /api/bovenstuk/size/:size:
 *   get:
 *     summary: Get bovenstuk by size
 *     tags:
 *     - Bovenstuk
 */
const getBovenstukBySize = async (ctx) => {
  ctx.body = await bovenstukService.getBySize(ctx.params.size);
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
  router.get('/name/:name', getBovenstukByName);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  //private routes
  router.post('/',requireAuthentication, requireAdmin, createBovenstuk);
  router.put('/:id',requireAuthentication, requireAdmin, updateBovenstuk);
  router.delete('/:id',requireAuthentication, requireAdmin, deleteBovenstuk);

  app.use(router.routes()).use(router.allowedMethods());
};