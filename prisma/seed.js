//  run it with npx prisma db seed
/* eslint-disable no-unused-vars */
const {
  PrismaClient,
} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  prisma.bovenstuks.deleteMany({});
  prisma.schoens.deleteMany({});
  prisma.broeks.deleteMany({});
  prisma.users.deleteMany({});

  const arnaud = await prisma.users.upsert({
    where: {
      id: '63ebd69ddebe0dafb2f89401',
    },
    update: {},
    create: {
      name: 'arnaud',
      password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
      email: 'arnaud@kledingapp.be',
      roles: '["user"]',
    },
  });
  const admin = await prisma.users.upsert({
    where: {
      id: '63ebd69ddebe0dafb2f89402',
    },
    update: {},
    create: {
      name: 'admin',
      password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
      email: 'admin@kledingapp.be',
      roles: '["admin"]',
    },
  });
  const ann = await prisma.users.upsert({
    where: {
      id: '63ebd69ddebe0dafb2f89403',
    },
    update: {},
    create: {
      name: 'ann',
      password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
      email: 'ann@kledingapp.be',
      roles: '["user"]',
    },
  });
  const axel = await prisma.users.upsert({
    where: {
      id: '63ebd69ddebe0dafb2f89404',
    },
    update: {},
    create: {
      name: 'axel',
      password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
      email: 'axel@kledingapp.be',
      roles: '["user"]',
    },
  });
  const stephan = await prisma.users.upsert({
    where: {
      id: '63ebd69ddebe0dafb2f89405',
    },
    update: {},
    create: {
      name: 'stephan',
      password: '$argon2id$v=19$m=131072,t=6,p=1$5DGD75S9VFXVupdaXsiwUA$lxUXSJc6LIAgCLcl01tc1xCz7owX8UdOi5piSJWQP/o',
      email: 'stephan@kledingapp.be',
      roles: '["user"]',
    },
  });
  const adidasBovenstuk = await prisma.bovenstuks.upsert({
    where: {
      id: '64ebd69ddebe0dafb2f89401',
    },
    update: {},
    create: {
      name: 'Adidas originals hoodie',
      dropdate: new Date('2020-01-01'),
      size: 'S',
    },
  });
  const nikeBovenstuk = await prisma.bovenstuks.upsert({
    where: {
      id: '64ebd69ddebe0dafb2f89402',
    },
    update: {},
    create: {
      name: 'Nike performance tshirt',
      dropdate: new Date('2020-01-10'),
      size: 'S',
    },
  });
  const schoeneen = await prisma.schoens.upsert({
    where: {
      id: '65ebd69ddebe0dafb2f89401',
    },
    update: {},
    create: {
      name: 'Nike SB Dunk Low Ben & Jerrys Chunky Dunky',
      dropdate: new Date('2020-05-23'),
      size: 45,
    },
  });
  const schoentwee = await prisma.schoens.upsert({
    where: {
      id: '65ebd69ddebe0dafb2f89402',
    },
    update: {},
    create: {
      name: 'Nike SB Dunk Low Parra',
      dropdate: new Date('2019-07-27'),
      size: 43,
    },
  });
  const schoendrie = await prisma.schoens.upsert({
    where: {
      id: '65ebd69ddebe0dafb2f89402',
    },
    update: {},
    create: {
      name: 'Nike SB Dunk Low Concepts Purple Lobster',
      dropdate: new Date('2018-12-14'),
      size: 43,
    },
  });
  const broekeen = await prisma.broeks.upsert({
    where: {
      id: '66ebd69ddebe0dafb2f89401',
    },
    update: {},
    create: {
      name: 'THE NORTH FACE MOUNTAIN LIGHT PANT XX KAWS',
      dropdate: new Date('2017-12-14'),
      size: 'M',
    },
  });
  const broektwee = await prisma.broeks.upsert({
    where: {
      id: '66ebd69ddebe0dafb2f89402',
    },
    update: {},
    create: {
      name: 'THE NORTH FACE NEW WATER SHORT',
      dropdate: new Date('2019-07-14'),
      size: 'M',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });