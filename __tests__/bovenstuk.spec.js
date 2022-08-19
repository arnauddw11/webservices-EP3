const {withServer, loginAdmin} = require('../__tests__/supertest.setup');

describe('Bovenstuks', () => {
  let request;
  let prisma;
  let loginHeader;

  withServer(({ prisma: p, supertest:s }) => {
    request = s;
    prisma = p;
  });

  beforeAll(async () => {
    loginHeader = await loginAdmin(request);
  });

  const url = '/api/bovenstuk';

  describe('GET /api/bovenstuk', () =>{
    beforeAll(async () => {
      await prisma.bovenstuks.create({
        data: {
          name: 'test',
          dropdate: new Date(),
          size: 'M',
        },
      });
    });
    afterAll(async () => {
      await prisma.bovenstuks.deleteMany({});
    });
    test('should return 1 bovenstuk and 200', async () => {
      const response = await request.get(url)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });
  });

  describe('GET byId /api/bovenstuk', () =>{
    beforeAll(async () => {
      await prisma.bovenstuks.create({
        data: {
          name: 'testById',
          dropdate: new Date(2018-1-1),
          size: 'M',
        },
      });
    });
    afterAll(async () => {
      await prisma.bovenstuks.deleteMany({});
    });
    test('should return 1 bovenstuk and 200', async () => {
      const data = await prisma.bovenstuks.findFirst({
        where: {
          name: 'testById',
        },
      });
      const response = await request.get(url + '/id/' + data.id)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        _id: data.id,
        name: 'testById',
        dropdate: '1970-01-01T00:00:02.016Z',
        size: 'M',
      });
    });
  });

  describe('GET byName /api/bovenstuk', () =>{
    beforeAll(async () => {
      await prisma.bovenstuks.create({
        data: {
          name: 'testByName',
          dropdate: new Date(2018-1-1),
          size: 'M',
        },
      });
    });
    afterAll(async () => {
      await prisma.bovenstuks.deleteMany({});
    });
    test('should return 1 bovenstuk and 200', async () => {
      const data = await prisma.bovenstuks.findFirst({
        where: {
          name: 'testByName',
        },
      });
      const response = await request.get(url + '/name/' + data.name)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.data[0]).toEqual({
        _id: data.id,
        name: 'testByName',
        dropdate: '1970-01-01T00:00:02.016Z',
        size: 'M',
      });
    });
  });
  
  describe(' POST /api/bovenstuk', () => {
    afterAll(async () => {
      prisma.bovenstuks.deleteMany({});
    });
    test('should return 201 and create a bovenstuk', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({
          name: 'testEenBovenstuk',
          dropdate: new Date(),
          size: 'M',
        });
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('testEenBovenstuk');
    });
  });
  describe('PUT /api/bovenstuk', () => {
    beforeAll(async () => {
      await prisma.bovenstuks.create({
        data: {
          name: 'putTest',
          dropdate: new Date('2019-1-2'),
          size: 'M',
        },
      });
    });
    afterAll(async () => {
      await prisma.bovenstuks.deleteMany({});
    });
    test('should return 200 and update a bovenstuk', async () => {
      const data = await prisma.bovenstuks.findFirst({
        where: {
          name: 'putTest',
        },
      });
      const response = await request.put(url+'/'+data.id)
        .set('Authorization', loginHeader)
        .send({
          name: 'testEenBovenstuk',
          size: 'XL',
        });
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();

      expect(response.body.name).toBe('testEenBovenstuk');
      expect(response.body.size).toBe('XL');
    });
  });

  describe('DELETE /api/bovenstuk', () => {
    beforeAll(async () => {
      await prisma.bovenstuks.create({
        data: {
          name: 'deleteTest',
          dropdate: new Date('2019-1-2'),
          size: 'M',
        },
      });
    });
    afterAll(async () => {
      await prisma.bovenstuks.deleteMany({});
    });
    test('should return 204 and return nothing', async () => {
      const data = await prisma.bovenstuks.findFirst({
        where: {
          name: 'deleteTest',
        },
      });
      const response = await request.delete(url+'/'+data.id)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});