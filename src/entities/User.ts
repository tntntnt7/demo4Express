import { Entity, Column } from 'typeorm'
import Base from './base'

@Entity()
export default class User extends Base {

	@Column('text', { nullable: true })
	public userName: string

	@Column()
	public password: string

	@Column({ nullable: true, default: -1 })
	public sex: number

	@Column({ nullable: true, default: -1 })
	public phoneNum: number
}
