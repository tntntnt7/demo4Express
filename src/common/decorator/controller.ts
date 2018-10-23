interface Idata {
	route?: string
}

export const Controller = (metadata: Idata) => {
	return target => {
		Object.assign(target.prototype, metadata)
	}
}
