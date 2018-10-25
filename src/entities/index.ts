import { createConnection } from 'typeorm'
import config from '../common/config'
import logger from '../common/utils/logger'

const initTypeORM = () => {
	createConnection(config.typeorm).then(connection => {
		logger.info(`${config.typeorm.type}: ${config.typeorm.database} ${config.typeorm.host}:${config.typeorm.port} connect successful!`)
	}).catch(err => {
		logger.error('!!! database connect error: ', err)
	})
}

export default initTypeORM
