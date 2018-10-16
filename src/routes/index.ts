import * as express from 'express'
import * as Controllers from '../controller'
import * as Services from '../service'

const router = express.Router()

console.log('Controllers => ', Controllers)
console.log('Services => ', Services)

// function initRoute(app: express.Application) {
function initRoute() {
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

	router.get('/', (req, res) => res.json('hello world'))
	return router
}

export default initRoute
