module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './data/SCDB.db3'
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	}
};
