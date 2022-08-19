const supertest = require('supertest');
const {
  PrismaClient,
} = require('@prisma/client');

const createServer = require('../src/createServer');


/**
 * Sign in using the test user.
 *
 * @param {supertest.SuperTest<supertest.Test>} supertest - The supertest agent to use
 *
 * @returns {Promise<string>} The Authorization header to use.
 */
const login = async (supertest) => {
  const response = await supertest.post('/api/users/login')
    .send({
      email: 'arnaud@kledingapp.be',
      password: 'password1',
    });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};

/**
 * Sign in using the admin test user.
 *
 * @param {supertest.SuperTest<supertest.Test>} supertest - The supertest agent to use
 *
 * @returns {Promise<string>} The Authorization header to use.
 */
const loginAdmin = async (supertest) => {
  const response = await supertest.post('/api/users/login')
    .send({
      email: 'admin@kledingapp.be',
      password: 'password1',
    });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};

/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent and the Knex instance
 *
 * @returns {supertest.SuperAgentTest} A supertest agent.
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      prisma: new PrismaClient(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  login,
  loginAdmin,
  withServer,
};