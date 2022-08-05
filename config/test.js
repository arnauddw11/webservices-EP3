module.exports = {
  log: {
    level: 'silly',
    disabled: true,
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    MONGODBUSERNAME: 'arnaud',
    MONGODBPASS: 'arnaud1',
  },
  pagination: {
    limit: 100,
    offset: 0,
  },
};