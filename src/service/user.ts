import { Repository, getConnectionManager } from 'typeorm'
import User from '../entities/User'
import config from '../common/config'
import * as utils from 'utility'
import { getToken } from '../common/utils/token'

export default class UserService {

	private _rep: Repository<User>

	get rep(): Repository<User> {
		if (!this._rep) {
			this._rep = getConnectionManager().get().getRepository(User)
		}
		return this._rep
	}

	public async create(user: User): Promise<any> {
		const use = await this.getByName(user.userName)
		if (use) { throw config.error(-1102) }

		user.password = utils.md5(user.password)
		return this.rep.save(user)
	}

	public async get(): Promise<User[]> {
		return this.rep.createQueryBuilder('user').getMany()
	}

	public async getById(id: number): Promise<User> {
		return this.rep.findOne(id)
	}

	public async getByName(name: string): Promise<User> {
		return await this.rep.createQueryBuilder('user')
								.where('user.userName = :name', { name })
								.getOne()
	}

	public async update(obj: User): Promise<any> {
		return this.rep.save(obj)
	}

	public async removeById(id: number): Promise<any> {
		const user = await this.getById(id)
		return this.rep.remove(user)
	}

	public async login(userName: string, password: string): Promise<any> {
		const user: User = await this.getByName(userName)
		// 用户不存在
		if (!user) { throw config.error(-1100) }
		// 验证密码
		this.verifyPassword(user, password)
		// 分配token
		user[config.token.userTokenPropName] = getToken(user)

		return user
	}

	public async userExist(userName: string): Promise<boolean> {
		const user = await this.getByName(userName)
		return Boolean(user)
	}

	private verifyPassword(user: User, password: string): void {
		const temp = utils.md5(password)
		if (temp !== user.password) {
			throw config.error(-1101)
		}
	}

}
