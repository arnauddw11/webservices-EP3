module.exports = {
	log: {
		level: 'info',
		disabled: false,
	},
	cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60, // 3h in seconds
	},
  //client wss mongoose
	database: {
    client: '',
		host: 'localhost',
    port: 3306,
    //name nog verzinnen
    name: '',
  },
	pagination: {
    limit: 100,
    offset: 0,
  },
};