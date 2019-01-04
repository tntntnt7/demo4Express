import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as cors from 'cors'
import logger from './common/utils/logger'
import files from './common/utils/file'
import config from './common/config'
import initRoute from './routes'
import { initTypeORM } from './entities'
import { initMongodb } from './models'

class Server {
	private app: express.Application

	constructor() {
		this.app = express()
	}

	public static async bootstrap() {
		const server = new Server()
		server.init()

		if (await initTypeORM() && await initMongodb()) {
			server.run()
		} else {
			logger.error('app boot failed')
		}
	}

	private init(): void {
		// 跨域支持（在设置路由之前，否则无效）
		this.app.use(cors())
		// 设置body-parser
		this.app.use(bodyParser.json({ limit: '10mb' }))
		// 静态资源访问
		this.app.use('/file', express.static(path.join(__dirname, 'common')))
		// 文件上传
		this.app.post('/file', files.upload, files.doUpload)
		// 设置路由
		this.app.use('/', initRoute())
	}

	private run(): void {
		this.app.listen(config.port, () => {
			logger.info(`app start at ${config.host}:${config.port}`)
		})
	}
}

Server.bootstrap()
