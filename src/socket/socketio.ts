import * as socketio from 'socket.io'
import config from '../common/config'
import logger from '../common/utils/logger'

export const io = socketio(config.socketPort, {
	pingInterval: 1000 * 30,
	pingTimeout: 1000 * 10,
})
logger.log(`socket start at ${config.socketPort}`)

export const initSocketIO = () => {

	io.on('connection', socket => {

		console.log('connection')

		socket.on('disconnect', () => {
			console.log('hahaha disconnect')
		})
	})
}
