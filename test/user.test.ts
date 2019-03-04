import { it, describe } from 'mocha'
import * as nock from 'nock'
import config from '../src/common/config'
import logger from '../src/common/utils/logger'

describe('user', () => {
	describe('get', () => {
		it('should return a list of users', async (done) => {
			nock(config.url)
					.get('/user')
					.reply(200, [
						{
							id: 2,
							createTime: '2018-10-26T08:16:13.000Z',
							userName: '123',
							password: '123456',
							sex: 1,
							phoneNum: 0,
						},
					])
			done()
		})
		it('should rerurn a user by id', async (done) => {
			done()
		})
	})

	describe('create', () => {
		it('should create a user', (done) => {
			setTimeout(() => {
				done()
			}, 3000)
		})
	})

	describe('update', () => {
		it.skip('should update user by id', (done) => {
			setTimeout(() => {
				done()
			}, 6000)
		})
	})

	describe('update', () => {
		it('should update user by id', async (done) => {
			done()
		})
	})

	describe('remove', () => {
		it('should remove user by id', async (done) => {
			done()
		})
	})
})
