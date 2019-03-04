import * as socketio from 'socket.io'
import config from '../common/config'
import logger from '../common/utils/logger'

const clientMap: Map<string, string> = new Map()

export const io = socketio(config.socketPort, {
	pingInterval: 1000 * 30,
	pingTimeout: 1000 * 10,
})
logger.info(`socket start at ${config.socketPort}`)

export const initSocketIO = () => {

	io.on('connection', socket => {
		socket.on('connected', clientId => {
			if (clientId) {
				logger.info(`SOCKET client: ${clientId} connected`)
				clientMap.set(socket.id, clientId)
			}
		})

		socket.on('disconnect', () => {
			const clientId = clientMap.get(socket.id)
			if (clientId) {
				logger.info(`SOCKET client: ${clientMap.get(socket.id)} disconnect`)
				clientMap.delete(socket.id)
			}
		})

		socket.on('error', error => logger.error(error))
	})
}
