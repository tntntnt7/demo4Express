import * as mongoose from 'mongoose'
import config from '../common/config'
import logger from '../common/utils/logger'

export const initMongodb = async () => {
	const url = `${config.mongodb.type}://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
	return await mongoose.connect(url, { useNewUrlParser: true }).then(() => {
		logger.info(`${url}  connected successfully!`)
		return true
	}).catch(err => {
		logger.error.bind(logger, `!!! database connect error: ${config.mongodb.type}`)
		return false
	})
}

export default mongoose
export const Schema = mongoose.Schema
