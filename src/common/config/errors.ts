const errors = {
	'-1000':	'token验证失败!',
	'-1001':	'必须提供token!',
	'-1002':	'token已过期!',

	'-1100':	'账号不存在',
	'-1101':	'密码错误!',

	'-0000':	'UnKnow',
}

export interface IError {
	code: number
	message: string
}

export const error = (code: number): IError => {
	for (const cell in errors) {
		if (errors.hasOwnProperty(cell) && Number(cell) === code) {
			return {
				code,
				message: errors[cell],
			}
		}
	}

	return {
		code,
		message: errors['-0000'],
	}
}
