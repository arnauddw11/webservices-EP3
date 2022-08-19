const Router = require('@koa/router');

const Role = require('../core/roles');
const broekService = require('../service/broek');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

/**
 * @swagger
 * tags:
 *   name: Broek
 *   description: Represents pants
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Broek:
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
 *             $ref: "#/components/examples/Broek"
 *       BroekList:
 *          allOf:
 *            - $ref: "#/components/schemas/ListResponse"
 *            - type: object
 *              required:
 *                - data
 *              properties:
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/Broek"
 *             
 *       responses:
 *        404NotFound:  
 *          description: The requested pants were not found.
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
 *                 details: "The requested pants were not found."
 *   examples:
 *     Broek:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       name: "Rick owens pants"
 *       dropdate: "2021-05-28T14:27:32.534Z"
 *       size: "L"
 *   requestBodies:
 *    Broek:
 *     description: The pants object to save
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: "string"
 *              example: "Adidas Yeezy Boost 370"
 *            dropdate:
 *              type: "string"
 *              format: date-time
 *            size:
 *              type: "string"
 *              example: "M"
 */

/**
 * @swagger
 * /api/broek:
 *   get:
 *     summary: Get all pants
 *     description: Get all pants.
 *     tags:
 *      - Broek
 *     responses:
 *       200:
 *         description: The created pants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Broek"
 */
const getAllBroeken = async (ctx) => {
  ctx.body = await broekService.getAll();
};

/**
 * @swagger
 * /api/broek/name/{name}:
 *  get:
 *    summary: Get pants by name
 *    description: Get pants by name.
 *    tags:
 *    - Broek
 *    parameters:
 *    - in: path
 *      name: name
 *      description: The name of the pants to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested pants
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Broek"
 * */
const getBroekByName = async (ctx) => {
  ctx.body = await broekService.getByName(ctx.params.name);
};

/**
 * @swagger
 * /api/broek/id/{id}:
 *  get:
 *    summary: Get pants by id
 *    description: Get pants by id.
 *    tags:
 *    - Broek
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the pants to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested pants
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Broek"
 * */
const getBroekById = async (ctx) => {
  ctx.body = await broekService.getById(ctx.params.id);
};

/**
 * @swagger
 * /api/Broek:
 *   post:
 *     summary: Create new pants
 *     description: Creates new pants for the signed in user.
 *     tags:
 *      - Broek
 *     requestBody:
 *       $ref: "#/components/requestBodies/Broek"
 *     responses:
 *       200:
 *         description: The created pants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Broek"
 * */
const createBroek = async (ctx) => {
  const newBroek = await broekService.create({
    ...ctx.request.body,
  });
  ctx.body = newBroek;
  ctx.status=201;
};

/**
 * @swagger
 * /api/broek/size/{size}:
 *  get:
 *    summary: Get pants by size
 *    description: Get pants by size.
 *    tags:
 *    - Broek
 *    parameters:
 *    - in: path
 *      name: size
 *      description: The size of the pants to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested pants
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Broek"
 * */
const getBroekBySize = async (ctx) => {
  ctx.body = await broekService.getBySize(ctx.params.size);
};

/**
 * @swagger
 * /api/broek/{id}:
 *  put:
 *    summary: Update pants
 *    description: Update pants.
 *    tags:
 *    - Broek
 *    requestBody:
 *       $ref: "#/components/requestBodies/Broek"
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the pants to update
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The updated pants
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Broek"
 * 
 * */
const updateBroek = async (ctx) => {
  ctx.body = await broekService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};

/**
 * @swagger
 * /api/broek/{id}:
 *  delete:
 *    summary: Delete pants
 *    description: Delete pants.
 *    tags:
 *    - Broek
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the pants to delete
 *      required: true
 *      schema:
 *        type: string
 * 
 * */
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