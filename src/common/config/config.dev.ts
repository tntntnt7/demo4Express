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
    password: '',
    database: 'demo4Express',
    // synchronize: true,
		logging: 'all', // https://github.com/typeorm/typeorm/blob/master/docs/logging.md
		entities: [
			`${__dirname}/../../entities/**/*.js`,
		],
	},
}
