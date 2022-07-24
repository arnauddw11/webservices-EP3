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
		DATABASE_URI: 'mongodb+srv://arnaud:arnaud1@cluster0.kpaa7.mongodb.net/testDB?retryWrites=true&w=majority',
    MONGODBUSERNAME: 'arnaud',
    MONGODBPASS: 'arnaud1'
  },
	pagination: {
    limit: 100,
    offset: 0,
  },
};
