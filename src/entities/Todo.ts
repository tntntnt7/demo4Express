import { Entity, Column } from 'typeorm'
import Base from './base'

@Entity()
export default class Todo extends Base {

	@Column('text')
	public title: string

	@Column('text')
	public content: string

	// 图片路径
	@Column('text', { nullable: true, default: '' })
	public path: string

	// 宽度
	@Column({ nullable: true, default: 1 })
	public cols: number

	@Column()
	public userId: number
}
