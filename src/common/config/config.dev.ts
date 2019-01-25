export const configDev = {
  debug: true,

  host: 'localhost',
	port: '7707',
	apiURL: 'http://localhost:7707',
	uploadPath: '../assets/uploads',
	uploadFieldName: 'file',

	mariadb: {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'hys_1234',
    database: 'demo4Express',
    // synchronize: true,
		logging: 'all', // https://github.com/typeorm/typeorm/blob/master/docs/logging.md
		entities: [
			`${__dirname}/../../entities/**/*.js`,
		],
	},

	mongodb: {
		type: 'mongodb',
		host: 'localhost',
		port: '27017',
		database: 'test',
		username: '',
		password: '',
		authSource: 'admin',
	},
}
