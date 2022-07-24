module.exports = {
	log: {
		level: 'info',
		disabled: false,
	},
	cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60, // 3h in seconds
	},

	database: {
    client: 'arnaud',
		host: 'mongodb+srv://arnaud:arnaud1@webservices.hbyz1zu.mongodb.net/?retryWrites=true&w=majority',
    port: 3306,
    name: 'webservices',
  },
	pagination: {
    limit: 100,
    offset: 0,
  },
};
