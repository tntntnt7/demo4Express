import Todo from '../models/Todo'

export default class TodoService {

	private _rep: any

	get rep() {
		if (!this._rep) {
			this._rep = Todo
		}
		return this._rep
	}

	public async create(obj: any): Promise<any> {
		const td = new this.rep(obj)
		return await td.save()
	}

	public async get(): Promise<any> {
		return this.rep.find({})
	}

	public async getById(id: number): Promise<any> {
		return this.rep.find({ _id: id })
	}

	public async update(obj: any): Promise<any> {
		const ret = await this.getById(obj._id)
		const td = await ret[0]
		td.content = obj.content
		td.done = obj.done
		td.image = obj.image

		return await td.save()
	}

	public async removeById(id: number): Promise<any> {
		return this.rep.deleteOne({ _id: id })
	}
}
