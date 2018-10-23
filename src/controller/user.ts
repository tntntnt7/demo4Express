import * as express from 'express'
import UserService from '../service/user'
import { Controller } from '../common/decorator/controller'
import { Action } from '../common/decorator/action'

@Controller({route: '/user'})
export default class UserController {

	private _service: UserService

	constructor(service: UserService) {
		this._service = service
	}

	@Action({route: '/test', method: 'get'})
	public async test(request: express.Request): Promise<any> {
		const result = await this._service.test()
		return result
	}

	@Action({route: '/login', method: 'post'})
	public async login(request: express.Request): Promise<any> {
		return await this._service.login()
	}
}
