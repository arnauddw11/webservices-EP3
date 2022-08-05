module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60, // 3h in seconds
  },
  pagination: {
    limit: 100,
    offset: 0,
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret: 'HiUoPh4j',
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: 'arnaud.be',
      audience: 'arnaud.be',
    },
  },
  database: {
    uri: 'mongodb+srv://arnaud:arnaud@cluster0.kpaa7.mongodb.net/?retryWrites=true&w=majority',
  },
};
