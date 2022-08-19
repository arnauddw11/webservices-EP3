const Router = require('@koa/router');

const Role = require('../core/roles');
const schoenService = require('../service/schoen');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

/**
 * @swagger
 * tags:
 *   name: Schoen
 *   description: Represents shoes
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Schoen:
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
 *               type: "integer"
 *           example:
 *             $ref: "#/components/examples/Schoen"
 *       SchoneList:
 *          allOf:
 *            - $ref: "#/components/schemas/ListResponse"
 *            - type: object
 *              required:
 *                - data
 *              properties:
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/Schoen"
 *             
 *       responses:
 *        404NotFound:  
 *          description: The requested shoes were not found.
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
 *     Schoen:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       name: "yeezy boost 350 v2"
 *       dropdate: "2021-05-28T14:27:32.534Z"
 *       size: "42"
 *   requestBodies:
 *    Schoen:
 *     description: The shoe object to save
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: "string"
 *              example: "Adidas Yeezy Boost 350 v2"
 *            dropdate:
 *              type: "string"
 *              format: date-time
 *            size:
 *              type: "string"
 *              example: "41"
 */

/**
 * @swagger
 * /api/schoen:
 *   get:
 *     summary: Get all shoes
 *     description: Get all shoes.
 *     tags:
 *      - Schoen
 *     responses:
 *       200:
 *         description: The created shoes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Schoen"
 */
const getAllSchoenen = async (ctx) => {
  ctx.body = await schoenService.getAll();
};

/**
 * @swagger
 * /api/schoen/name/{name}:
 *  get:
 *    summary: Get shoes by name
 *    description: Get shoes by name.
 *    tags:
 *    - Schoen
 *    parameters:
 *    - in: path
 *      name: name
 *      description: The name of the shoes to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested shoes
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Schoen"
 * */
const getSchoenByName = async (ctx) => {
  ctx.body = await schoenService.getByName(ctx.params.name);
};

/**
 * @swagger
 * /api/schoen/id/{id}:
 *  get:
 *    summary: Get shoes by id
 *    description: Get shoes by id.
 *    tags:
 *    - Schoen
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the shoes to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested shoes
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Schoen"
 * */
const getSchoenById = async (ctx) => {
  ctx.body = await schoenService.getById(ctx.params.id);
};

/**
 * @swagger
 * /api/Schoen:
 *   post:
 *     summary: Create new shoes
 *     description: Creates new shoes for the signed in user.
 *     tags:
 *      - Schoen
 *     requestBody:
 *       $ref: "#/components/requestBodies/Schoen"
 *     responses:
 *       200:
 *         description: The created shoes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Schoen"
 * */
const createSchoen = async (ctx) => {
  const newSchoen = await schoenService.create({
    ...ctx.request.body,
  });
  ctx.body = newSchoen;
  ctx.status=201;
};

/**
 * @swagger
 * /api/schoen/size/{size}:
 *  get:
 *    summary: Get shoes by size
 *    description: Get shoes by size.
 *    tags:
 *    - Schoen
 *    parameters:
 *    - in: path
 *      name: size
 *      description: The size of the shoes to get
 *      required: true
 *      schema:
 *        type: integer
 *      responses:
 *        200:
 *          description: The requested shoes
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Schoen"
 * */
const getSchoenBySize = async (ctx) => {
  ctx.body = await schoenService.getBySize(ctx.params.size);
};

/**
 * @swagger
 * /api/schoen/{id}:
 *  put:
 *    summary: Update shoes
 *    description: Update shoes.
 *    tags:
 *    - Schoen
 *    requestBody:
 *       $ref: "#/components/requestBodies/Schoen"
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the shoes to update
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The updated shoes
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Schoen"
 * 
 * */
const updateSchoen = async (ctx) => {
  ctx.body = await schoenService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};

/**
 * @swagger
 * /api/schoen/{id}:
 *  delete:
 *    summary: Delete shoes
 *    description: Delete shoes.
 *    tags:
 *    - Schoen
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the shoes to delete
 *      required: true
 *      schema:
 *        type: string
 * 
 * */
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