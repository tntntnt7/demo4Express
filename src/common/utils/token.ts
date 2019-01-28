import * as jwt from 'jsonwebtoken'
import logger from './logger'
import config from '../config';

interface IVerifyToken {
	success: boolean
	decoded?: any
	error?: any
}

export const getToken = (payload: any): string => {
	payload = {...payload}
	const token = jwt.sign(payload, config.token.secret, { expiresIn: config.token.expiresIn })
	logger.info(`get token ${token}`)

	return token
}

export const verifyToken = (token: string): IVerifyToken => {
	try {
		const decoded = jwt.verify(token, config.token.secret)
		return { success: true, decoded }
	} catch (err) {
		logger.warn(`token error: ${err}`)

		let error = config.error['-1000']
		if (err.name === 'JsonWebTokenError' && err.message === 'jwt must be provided') {
      error = config.error['-1001']
    } else if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
      error = config.error['-1002']
		}

		return { success: false, error }
	}
}
