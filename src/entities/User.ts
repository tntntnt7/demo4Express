import { Entity, Column } from 'typeorm'
import Base from './base'

@Entity()
export default class User extends Base {

	@Column('text', { nullable: true })
	public userName: string

	@Column()
	public password: string

	@Column()
	public sex: number

	@Column('text', { nullable: true })
	public phoneNum: number
}
