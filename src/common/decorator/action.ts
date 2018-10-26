interface Idata {
	/**
	 * 路由
	 */
	route?: string

	/**
	 * 方法
	 */
	method?: 'get' | 'post' | 'put' | 'delete'
}

/**
 * action
 * @param metadata
 */
export const Action = function(metadata: Idata) {
	return function(target, property, descriptor) {
		const func: Function = descriptor.value
		const pack = async (context: any, params: any) => {
			try {
				const result = await func.apply(context, [params])
				return result
			} catch (error) {
				console.log(error)
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
