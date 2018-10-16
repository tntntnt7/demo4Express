import * as express from 'express'
import * as bodyParser from 'body-parser'

import initRoute from './routes'

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
	}

	private run(): void {
		this.app.listen(3000, () => {
			console.log('app start!')
		})
	}
}

Server.bootstrap()
