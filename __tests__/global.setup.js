//import roles
const config = require('config');
const {
  PrismaClient,
} = require('@prisma/client');

const Role = require('../src/core/roles');
const {
  userModel,
} = require('../src/data/models/user');
const { initializeDb } = require('../src/data');
const { initializeLogger } = require('../src/core/logging');


module.exports = async () => {
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });

  await initializeDb();
  const prisma = new PrismaClient();
  await prisma.$connect();
  await prisma.users.deleteMany({});
  await prisma.bovenstuks.deleteMany({});
  await prisma.broeks.deleteMany({});
  await prisma.schoens.deleteMany({});
  await prisma.outfits.deleteMany({});

  userModel.insertMany([{
    name: 'admin',
    email: 'admin@kledingapp.be',
    password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
    roles: JSON.stringify([Role.ADMIN]),
  }, {
    name: 'arnaud',
    email: 'arnaud@kledingapp.be',
    password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
    roles: JSON.stringify([Role.USER]),
  }]);
};