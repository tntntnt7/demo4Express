import * as jwt from 'jsonwebtoken'
import logger from './logger'

export const getToken = (payload: any): string => {
	payload = {...payload}
	const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })
	logger.info(`get token ${token}`)
	return token
}

export const verifyToken = (token: string): boolean => {
	return true
}
