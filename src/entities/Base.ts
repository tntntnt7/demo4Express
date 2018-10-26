import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

export default class Base extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number

	@Column('datetime', { default: () => 'NOW()' })
	public createTime: string
}
