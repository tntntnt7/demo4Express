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

	@Action({route: '/exist', method: 'get'})
	public async userExist(request: express.Request): Promise<any> {
		const userName = request.query.name
		const result = await this._service.userExist(userName)
		return result
	}

	@Action({route: '/login', method: 'post'})
	public async login(request: express.Request): Promise<any> {
		const { userName, password } = request.body
		return this._service.login(userName, password)
	}

	@Action({route: '/', method: 'get', verifyToken: true})
	public async get(request: express.Request): Promise<any> {
		const result = await this._service.get()
		return result
	}

	@Action({route: '/', method: 'post'})
	public async register(request: express.Request): Promise<any> {
		const user = request.body as User
		return await this._service.create(user)
	}

	@Action({route: '/', method: 'put', verifyToken: true})
	public async update(request: express.Request): Promise<any> {
		const user = request.body as User
		const result = await this._service.update(user)
		return result
	}

	// 放在userExist后面,不然会出现 /exist 的请求会被此方法拦截
	@Action({route: '/:id', method: 'get', verifyToken: true})
	public async getById(request: express.Request): Promise<any> {
		const id = request.params.id
		const result = await this._service.getById(id)
		return result
	}

	@Action({route: '/:id', method: 'delete', verifyToken: true})
	public async removeById(request: express.Request): Promise<any> {
		const id = request.params.id
		const result = await this._service.removeById(id)
		return result
	}

}
