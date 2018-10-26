import * as express from 'express'
import UserService from '../service/user'
import { Controller } from '../common/decorator/controller'
import { Action } from '../common/decorator/action'
import User from '../entities/User'

@Controller({route: '/user'})
export default class UserController {

	private _service: UserService

	constructor(service: UserService) {
		this._service = service
	}

	@Action({route: '/', method: 'get'})
	public async get(request: express.Request): Promise<any> {
		const result = await this._service.get()
		return result
	}

	@Action({route: '/', method: 'post'})
	public async register(request: express.Request): Promise<any> {
		const user = request.body as User
		return await this._service.create(user)
	}

	@Action({route: '/', method: 'put'})
	public async update(request: express.Request): Promise<any> {
		const user = request.body as User
		const result = await this._service.update(user)
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
		const result = await this._service.removeById(id)
		return result
	}

}
