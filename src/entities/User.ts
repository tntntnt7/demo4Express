import { Entity, Column } from 'typeorm'
import Base from './Base'

@Entity()
export default class User extends Base {

	@Column('text', { nullable: true })
	public userName: string

	@Column()
	public password: string

	@Column()
	public sex: number

	@Column('int', { nullable: false, default: 0 })
	public phoneNum: number
}
