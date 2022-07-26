const Koa = require('koa');
const config = require('config');
const koaCors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const swaggerJsdoc = require('swagger-jsdoc');
const {
  koaSwagger,
} = require('koa2-swagger-ui');

const swaggerOptions = require('../swagger.config');

const {
  initializeLogger,
  getLogger,
} = require('./core/logging');
const {
  initializeDb,
  closeDb,
} = require('./data');
const installRest = require('./rest');


const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');


module.exports = async function createServer() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    isProduction: NODE_ENV === 'production',
    defaultMeta: {
      NODE_ENV,
    },
  });


  await initializeDb();

  const app = new Koa();


  // Add CORS
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    }),
  );


  const logger = getLogger();


  app.use(bodyParser());

  const spec = swaggerJsdoc(swaggerOptions);
  app.use(
    koaSwagger({
      routePrefix: '/swagger', // host at /swagger instead of default /docs
      specPrefix: '/swagger/spec', // route where the spec is returned
      exposeSpec: true, // expose spec file
      swaggerOptions: { // passed to SwaggerUi()
        spec,
      },
    }),
  );

  installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        app.listen(9000);
        logger.info('🚀 Server listening on http://localhost:9000');
        resolve();
      });
    },

    async stop() {
      {
        app.removeAllListeners();
        await closeDb();
        getLogger().info('Goodbye');
      }
    },
  };
};