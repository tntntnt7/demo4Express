import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

export default class BaseClass extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number

	@Column()
	public createTime: string
}
