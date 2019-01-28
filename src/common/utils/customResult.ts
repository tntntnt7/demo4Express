import { IError } from '../config/errors'

interface IResult {
	success:	boolean
	data:	any
	error?: IError
}

export const handleErrorResult = (error: IError): IResult => {
	return {
		success: false,
		data: null,
		error,
	}
}

export const handleSuccessfulResult = (result: any): IResult => {
	return {
		success: true,
		data: result,
	}
}
