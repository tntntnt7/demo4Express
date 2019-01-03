import * as express from 'express'
import * as Controllers from '../controller'
import * as Services from '../service'

const router = express.Router()

function initRoute() {
	// 跨域支持
	router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
	})

	Object.keys(Controllers).forEach(key => {
		const service = Reflect.construct(Services[key], [null])
		const controller = Reflect.construct(Controllers[key], [service])

		const mainRoute = controller.route
		for (const cell of Reflect.ownKeys(Controllers[key].prototype)) {
			if (typeof controller[cell] === 'function' && cell !== 'constructor') {
				const { route, method, func } = controller[cell]()
				router[method](`${mainRoute}${route}`, async (req, res) => {
					const result = await func(controller, req)
					res.json(result)
				})
			}
		}
	})

	return router
}

export default initRoute
