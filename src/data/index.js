const config = require('config');
const mongoose = require('mongoose');
const { env } = require('../config/custom-environment-variables');
const { getChildLogger } = require('../core/logging');

let db;
async function initialiseDb() {
  const logger = getChildLogger('database');
  logger.info('Initialiseren van de databank connectie');

  const uri = "mongodb+srv://arnaud:arnaud1@cluster0.kpaa7.mongodb.net/testDB?retryWrites=true&w=majority";
  
  logger.info(uri);
  try {
    mongoose.connect(
      uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => {
        logger.info(" Mongoose is verbonden")
        db = mongoose.connection;

        db.on('error', logger.info.bind(logger, 'MongoDB connectie niet geslaagd:'));
      }
    );
  } catch (e) {
    logger.info("Kan geen verbinding maken");
  }
};

function getMongoDb() {
  if (!db) throw new Error('Initialiseer data laag alvorens in de mongodb instance te gaan');
  return db;
};
async function closeDb() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await db.stop();
}
  module.exports = {
    initialiseDb,
    getMongoDb,
    closeDb
  };