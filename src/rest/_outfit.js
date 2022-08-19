const Router = require('@koa/router');

const Role = require('../core/roles');
const outfitService = require('../service/outfit');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
/**
 * @swagger
 * tags:
 *   name: Outfit
 *   description: Represents an outfit
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Outfit:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - bovenstukId
 *             - broekId
 *             - schoenId
 *           properties:
 *             bovenstukId:
 *               type: "string"
 *             broekId:
 *               type: "string"
 *             schoenId:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Outfit"
 *       OutfitList:
 *          allOf:
 *            - $ref: "#/components/schemas/ListResponse"
 *            - type: object
 *              required:
 *                - data
 *              properties:
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/Outfit"
 *             
 *       responses:
 *        404NotFound:  
 *          description: The requested outfit was not found.
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
 *                 details: "The requested outfit was not found."
 *   examples:
 *     Oufit:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       bovenstukId: "62f0ef08c42d98f6f92358e3"
 *       broekId: "62f0ef08c42d98f6f92358e3"
 *       schoenId: "62f0ef08c42d98f6f92358e3"
 *   requestBodies:
 *    Outfit:
 *     description: The outfit object to save
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            bovenstukId:
 *              type: "string"
 *              example: "62f0ef08c42d98f6f92358e3"
 *            broekId:
 *              type: "string"
 *              example: "62f0ef08c42d98f6f92358e3"
 *            schoenId:
 *              type: "string"
 *              example: "62f0ef08c42d98f6f92358e3"
 */

/**
 * @swagger
 * /api/outfit:
 *   get:
 *     summary: Get all outfits
 *     description: Get all outfits.
 *     tags:
 *      - Outfit
 *     responses:
 *       200:
 *         description: The created outfit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Outfit"
 */
const getAllOutfits = async (ctx) => {
  ctx.body = await outfitService.getAll();
};

/**
 * @swagger
 * /api/outfit/id/{id}:
 *  get:
 *    summary: Get outfit by id
 *    description: Get outfit by id.
 *    tags:
 *    - Outfit
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the outfit to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested outfit
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Outfit"
 * */
const getOutfitById = async (ctx) => {
  ctx.body = await outfitService.getById(ctx.params.id);
};

/**
 * @swagger
 * /api/Schoen:
 *   post:
 *     summary: Create a new outfit
 *     description: Creates a new outfit for the signed in user.
 *     tags:
 *      - Outfit
 *     requestBody:
 *       $ref: "#/components/requestBodies/Outfit"
 *     responses:
 *       200:
 *         description: The created outfit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Outfit"
 * */
const createOutfit = async (ctx) => {
  const newOutfit = await outfitService.create({
    ...ctx.request.body,
  });
  ctx.body = newOutfit;
  ctx.status=201;
};

/**
 * @swagger
 * /api/outfit/{id}:
 *  put:
 *    summary: Update outfit
 *    description: Update outfit.
 *    tags:
 *    - Outfit
 *    requestBody:
 *       $ref: "#/components/requestBodies/Outfit"
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the outfit to update
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The updated outfit
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/Outfit"
 * 
 * */
const updateOutfit = async (ctx) => {
  ctx.body = await outfitService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
};

/**
 * @swagger
 * /api/outfit/{id}:
 *  delete:
 *    summary: Delete outfit
 *    description: Delete outfit.
 *    tags:
 *    - Outfit
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the outfit to delete
 *      required: true
 *      schema:
 *        type: string
 * 
 * */
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

  const requireAdmin = makeRequireRole(Role.ADMIN);

  //private routes
  router.post('/',requireAuthentication, requireAdmin, createOutfit);
  router.put('/:id',requireAuthentication, requireAdmin, updateOutfit);
  router.delete('/:id',requireAuthentication, requireAdmin, deleteOutfit);

  app.use(router.routes()).use(router.allowedMethods());
};