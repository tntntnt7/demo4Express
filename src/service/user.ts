export default class UserService {

	public async login(): Promise<string> {
		return await Promise.resolve('login success!')
	}

	public async test(): Promise<string> {
		return await Promise.resolve('test!')
	}
}
