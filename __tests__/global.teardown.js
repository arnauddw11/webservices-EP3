const {
  PrismaClient,
} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async () => {
  // Remove any leftover data
  await prisma.$connect();
  await prisma.users.deleteMany({});
  await prisma.bovenstuks.deleteMany({});
  await prisma.broeks.deleteMany({});
  await prisma.schoens.deleteMany({});
  await prisma.outfits.deleteMany({});
  await prisma.$disconnect();
};