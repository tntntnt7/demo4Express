export const configDev = {
  debug: true,

  host: 'localhost',
	port: '7707',

	typeorm: {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'demo4Express',
    synchronize: true,
		logging: 'all',
		entities: [
			`${__dirname}/../../entities/**/*.js`,
		],
	},
}
