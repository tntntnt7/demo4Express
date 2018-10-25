import * as express from 'express'
import * as bodyParser from 'body-parser'
import logger from './common/utils/logger'
import config from './common/config'
import initRoute from './routes'
import initTypeORM from './entities'

class Server {
	private app: express.Application

	constructor() {
		this.app = express()
	}

	public static bootstrap(): void {
		const server = new Server()
		server.init()
		server.run()
	}

	private init(): void {
		// 静态资源访问
		this.app.use('/static', express.static('public'))
		// 设置body-parser
		this.app.use(bodyParser.json({ limit: '10mb' }))
		// 设置路由
		this.app.use('/', initRoute())

		// 链接数据库
		initTypeORM()
	}

	private run(): void {
		this.app.listen(config.port, () => {
			logger.info(`app start at ${config.host}:${config.port}`)
		})
	}
}

Server.bootstrap()
