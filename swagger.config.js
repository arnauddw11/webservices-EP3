module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kleding API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Koa and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'kledingAPI',
        url: 'http://localhost:9000',
        email: 'arnaud.deweghe@student.hogent.be',
      },
    },
    servers: [{
      url: 'http://localhost:9000/',
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/rest/*.js'],
};