import { getConnectionManager, getRepository, Repository } from 'typeorm'
import Todo from '../entities/Todo'
export default class TodoService {

	private _rep: any

	get rep(): Repository<Todo> {
		if (!this._rep) {
			this._rep = getConnectionManager().get().getRepository(Todo)
		}
		return this._rep
	}

	public async create(obj: Todo): Promise<any> {
		return await this.rep.save(obj)
	}

	public async getById(id: number): Promise<any> {
		return this.rep.find({ id })
	}

	public async getByUserId(userId: number, where: any): Promise<any> {
		return this.rep.createQueryBuilder('todo')
					.where('userId = :userId', {userId})
					.orderBy('deadline', 'DESC')
					.getMany()
	}

	public async update(obj: any): Promise<any> {
		return await this.rep.save(obj)
	}

	public async removeById(id: number): Promise<any> {
		const todo = await this.getById(id)
		return this.rep.remove(todo)
	}
}
