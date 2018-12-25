import logger from '../common/utils/logger'

const base = {
	createTime: { type: Date },
	updateTime: { type: Date },
}

export default base

export const preFunc = (next: any) => {
	const now = new Date()
	if (!this.create_time) {
		this.createTime = now
	} else {
		this.updateTime = now
	}
	next()
}
export const postFunc = (message: string) => {
	logger.info(message)
}
