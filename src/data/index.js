const config = require('config');
const mongoose = require('mongoose');

const {
  getChildLogger,
} = require('../core/logging');

let db;
const URI = config.get('database.uri');

async function initializeDb() {
  //TODO migrations en seeding vd database
  const logger = getChildLogger('database');
  logger.info('Initialiseren van de databank connectie');

  try {
    mongoose.connect(
      URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        logger.info(' Mongoose is verbonden');
        db = mongoose.connection;

        db.on('error', logger.info.bind(logger, 'MongoDB connectie niet geslaagd:'));
      },
    );
  } catch (e) {
    logger.info('Kan geen verbinding maken');
  }
}

function getMongoDb() {
  if (!db) throw new Error('Initialiseer data laag alvorens in de mongodb instance te gaan');
  return db;
}
async function closeDb() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await db.stop();
}
module.exports = {
  initializeDb,
  getMongoDb,
  closeDb,
};