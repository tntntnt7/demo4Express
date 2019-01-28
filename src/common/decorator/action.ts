import { verifyToken as verifyingToken } from '../utils/token'
import logger from '../utils/logger'
import config from '../config'

interface Idata {
	/**
	 * 路由
	 */
	route?: string

	/**
	 * 方法
	 */
	method?: 'get' | 'post' | 'put' | 'delete'

	/**
	 * 是否验证token
	 */
	verifyToken?: boolean
}

/**
 * action
 * @param metadata
 */
export const Action = function(metadata: Idata) {
	return function(target, property, descriptor) {
		const { verifyToken } = metadata
		const func: Function = descriptor.value
		const pack = async (context: any, params: any) => {
			try {
				const result = await func.apply(context, [params])
				if (verifyToken) {
					const vt = verifyingToken(params.headers[config.token.headTag])
					return vt.success ? result : vt
				}

				return result
			} catch (error) {
				logger.error(error)

				return error
			}
		}

		descriptor.value = () => {
			return {
				...metadata,
				func: pack,
			}
		}

		return descriptor
	}
}
