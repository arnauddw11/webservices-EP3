const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');
const Role = require('../core/roles');
const { requireAuthentication, makeRequireRole } = require('../core/auth');

const validate = require('./_validation');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Represents user
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       allOf:
 *         - $ref: "#/components/schemas/User"
 *         - type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: "string"
 *             email:
 *               type: "string"
 *               format: "email"
 *             password:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/User"
 *       UserList:
 *          allOf:
 *            - $ref: "#/components/schemas/ListResponse"
 *            - type: object
 *              required:
 *                - data
 *              properties:
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/User"
 *             
 *       responses:
 *        404NotFound:  
 *          description: The requested user was not found.
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
 *                 details: "The requested user was not found."
 *   examples:
 *     User:
 *       _id: "62f0ef08c42d98f6f92358e3"
 *       name: "Arnaud dw"
 *       email: "arnaud.dw@kledingapp.be"
 *       password: "test"
 *   requestBodies:
 *    User:
 *     description: The user object to save
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: "string"
 *              example: "admin@kledingapp.be"
 *            password:
 *              type: "string"
 *              example: "password1"
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login in the user
 *     description: Login the user.
 *     tags:
 *      - User
 *     requestBody:
 *       $ref: "#/components/requestBodies/User"
 *     responses:
 *       200:
 *         description: The logged in user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const session = await userService.login(email, password);
  ctx.body = session;
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Register in the user
 *     description: Register the user.
 *     tags:
 *      - User
 *     responses:
 *       200:
 *         description: The registered in user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
const register = async (ctx) => {
  const session = await userService.register(ctx.request.body);
  ctx.body = session;
};
register.validationScheme = {
  body: {
    name: Joi.string().max(255),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(30),
  },
};

/**
 * @swagger
 * /api/users/register:
 *   get:
 *     summary: Get all users
 *     description: Get all users.
 *     tags:
 *      - User
 *     responses:
 *       200:
 *         description: All the users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};

/**
 * @swagger
 * /api/users/id/{id}:
 *  get:
 *    summary: Get user by id
 *    description: Get user by id.
 *    tags:
 *    - User
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the user to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested user
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 * */
const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

/**
 * @swagger
 * /api/users/email/{email}:
 *  get:
 *    summary: Get user by email
 *    description: Get user by email.
 *    tags:
 *    - User
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the user to get
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The requested user
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 * */
const getUserByEmail = async (ctx) => {
  const user = await userService.getByEmail(ctx.params.email);
  ctx.body = user;
};
getUserByEmail.validationScheme = {
  params: {
    email: Joi.string(),
  },
};

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update user
 *    description: Update user.
 *    tags:
 *    - User
 *    requestBody:
 *       $ref: "#/components/requestBodies/User"
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the user to update
 *      required: true
 *      schema:
 *        type: string
 *      responses:
 *        200:
 *          description: The updated user
 *          content:
 *            application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 * 
 * */
const updateUserById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = user;
};
updateUserById.validationScheme = {
  params: {
    id: Joi.string(),
  },
  body: {
    name: Joi.string().max(255),
    email: Joi.string().email(),
  },
};

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Delete user
 *    description: Delete user.
 *    tags:
 *    - User
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the user to delete
 *      required: true
 *      schema:
 *        type: string
 * 
 * */
const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};


module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: '/users',
  });

  // Publieke routes
  router.post('/login', validate(login.validationScheme), login);
  router.post('/register', validate(register.validationScheme), register);

  const requireAdmin = makeRequireRole(Role.ADMIN);
  
  // Routes met authentication/autorisation
  router.get('/', requireAuthentication, requireAdmin, validate(getAllUsers.validationScheme), getAllUsers);
  router.get('/id/:id', requireAuthentication, validate(getUserById.validationScheme), getUserById);
  router.get('/email/:email', requireAuthentication, validate(getUserByEmail.validationScheme), getUserByEmail);
  router.put('/:id', requireAuthentication, validate(updateUserById.validationScheme), updateUserById);
  router.delete('/:id', requireAuthentication, validate(deleteUserById.validationScheme), deleteUserById);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};