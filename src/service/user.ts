import { Repository, getConnectionManager } from 'typeorm'
import User from '../entities/User'

export default class UserService {

	private _rep: Repository<User>

	get rep(): Repository<User> {
		if (!this._rep) {
			this._rep = getConnectionManager().get().getRepository(User)
		}
		return this._rep
	}

	public async create(obj: User): Promise<any> {
		return this.rep.save(obj)
	}

	public async get(): Promise<User[]> {
		return this.rep.createQueryBuilder('user').getMany()
	}

	public async getById(id: number): Promise<User> {
		return this.rep.findOne(id)
	}

	public async update(obj: User): Promise<any> {
		return this.rep.save(obj)
	}

	public async removeById(id: number): Promise<any> {
		const user = await this.getById(id)
		return this.rep.remove(user)
	}
}
