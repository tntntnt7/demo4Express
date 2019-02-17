import * as express from 'express'
import { Controller } from '../common/decorator/controller'
import { Action } from '../common/decorator/action'
import TodoService from '../service/todo'

@Controller({ route: '/todo' })
export default class TodoController {

	private _service: TodoService

	constructor(service: TodoService) {
		this._service = service
	}

	@Action({route: '/', method: 'get', verifyToken: true})
	public async get(request: express.Request): Promise<any> {
		const { userId, where } = request.query
		return await this._service.getByUserId(userId, where)
	}

	@Action({route: '/', method: 'post', verifyToken: true})
	public async creact(request: express.Request): Promise<any> {
		const todo = request.body
		return await this._service.create(todo)
	}

	@Action({route: '/', method: 'put'})
	public async update(request: express.Request): Promise<any> {
		const todo = request.body
		const result = await this._service.update(todo)
		return result
	}

	@Action({route: '/:id', method: 'get'})
	public async getById(request: express.Request): Promise<any> {
		const id = request.params.id
		const result = await this._service.getById(id)
		return result
	}

	@Action({route: '/:id', method: 'delete'})
	public async removeById(request: express.Request): Promise<any> {
		const id = request.params.id
		return await this._service.removeById(id)
	}

}
