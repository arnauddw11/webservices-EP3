const Router = require('@koa/router');

const Role = require('../core/roles');
const bovenstukService = require('../service/bovenstuk');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

/**
 * @swagger
 * tags:
 *   name: Bovenstuks
 *   description: Represents a garment worn as an upper garment
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Bovenstuk:
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
 *       BovenstukList:
 *          allOf:
 *            - $ref: "#/components/schemas/ListResponse"
 *            - type: object
 *              required:
 *                - data
 *              properties:
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/Bovenstuk"
 *             
 *       responses:
 *        404NotFound:  
 *          description: The requested bovenstuk was not found.
 *          content: 
 *           application/json:
 *            schema:
 *              type: object
 *              required:
 *                - code
 *                - details
 *              properties:
 *               code:
 *                type: "string"
 *              details:
 *               type: "string"
 *               description: The details of the error.
 *               stack:
 *                type: "string"
 *                description: The stacktrace of the error.
 *                example:
 *                 code: "NotFound"
 *                 details: "The requested bovenstuk was not found."
 *   examples:
 *     Bovenstuk:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       name: "Adidas performance tshirt"
 *       dropdate: "2021-05-28T14:27:32.534Z"
 *       size: "M"
 *   requestBodies:
 *    Bovenstuk:
 *     description: The bovenstuk object to save
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: "string"
 *              example: "Comme des Garcons PLAY Red Emblem"
 *            dropdate:
 *              type: "string"
 *              format: date-time
 *            size:
 *              type: "string"
 *              example: "M"
 */

/**
 * @swagger
 * /api/bovenstuk:
 *   get:
 *     summary: Get all bovenstuks
 *     description: Get all bovenstuks.
 *     tags:
 *      - Bovenstuk
 *     responses:
 *       200:
 *         description: All Bovenstuks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Bovenstuk"
 */
const getAllBovenstukken = async (ctx) => {
  ctx.body = await bovenstukService.getAll();
};

/**
 * @swagger
 * /api/bovenstuk/name/{name}:
 *  get:
 *    summary: Get a bovenstuk by name
 *    description: Get a bovenstuk by name.
 *    tags:
 *    - Bovenstuk
 *    parameters:
 *    - in: path
 *      name: name
 *      description: The name of the bovenstuk to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested bovenstuk
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Bovenstuk"
 * */
const getBovenstukByName = async (ctx) => {
  ctx.body = await bovenstukService.getByName(ctx.params.name);
};

/**
 * @swagger
 * /api/bovenstuk/id/{id}:
 *  get:
 *    summary: Get a bovenstuk by id
 *    description: Get a bovenstuk by id.
 *    tags:
 *    - Bovenstuk
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the bovenstuk to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested bovenstuk
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Bovenstuk"
 * */
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
 *     requestBody:
 *       $ref: "#/components/requestBodies/Bovenstuk"
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
 * /api/bovenstuk/size/{size}:
 *  get:
 *    summary: Get a bovenstuk by size
 *    description: Get a bovenstuk by size.
 *    tags:
 *    - Bovenstuk
 *    parameters:
 *    - in: path
 *      name: size
 *      description: The size of the bovenstuk to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested bovenstuk
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Bovenstuk"
 * */
const getBovenstukBySize = async (ctx) => {
  ctx.body = await bovenstukService.getBySize(ctx.params.size);
};


/**
 * @swagger
 * /api/bovenstuk/{id}:
 *  put:
 *    summary: Update a bovenstuk
 *    description: Update a bovenstuk.
 *    tags:
 *    - Bovenstuk
 *    requestBody:
 *       $ref: "#/components/requestBodies/Bovenstuk"
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the bovenstuk to update
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The updated bovenstuk
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Bovenstuk"
 * 
 * */
const updateBovenstuk = async (ctx) => {
  ctx.body = await bovenstukService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};

/**
 * @swagger
 * /api/bovenstuk/{id}:
 *  delete:
 *    summary: Delete a bovenstuk
 *    description: Delete a bovenstuk.
 *    tags:
 *    - Bovenstuk
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the bovenstuk to delete
 *      required: true
 *      schema:
 *        type: string
 * 
 * */
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