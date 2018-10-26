import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import config from '../common/config'
import logger from '../common/utils/logger'

const initTypeORM = async () => {
	const option: ConnectionOptions = config.mariadb as ConnectionOptions
	return await createConnection(option).then(connection => {
		// connection.synchronize(true)
		logger.info(`${config.mariadb.type}://${config.mariadb.host}:${config.mariadb.port}/${config.mariadb.database} connected successfully!`)
		return true
	}).catch(err => {
		logger.error('!!! database connect error: ', err)
		return false
	})
}

export default initTypeORM
