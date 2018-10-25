import { Entity, Column } from 'typeorm'
import BaseClass from './BaseClass'

@Entity()
export default class User extends BaseClass {

	@Column()
	public userName: string

	@Column()
	public password: string

	@Column()
	public sex: number

	@Column()
	public phoneNum: number
}
