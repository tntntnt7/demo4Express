import { Entity, Column } from 'typeorm'
import Base from './base'

@Entity()
export default class Todo extends Base {

	@Column('text')
	public title: string

	@Column('text')
	public content: string

	@Column('datetime', { nullable: true, default: () => 'NOW()' })
	public deadline: string

	@Column({ nullable: true, default: 0 })
	public done: number

	@Column()
	public userId: number
}
