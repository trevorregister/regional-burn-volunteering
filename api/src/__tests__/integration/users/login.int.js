//const request = require('../supertest.config')
const client = require('../setup')
const { Builder } = require('../../builder')

const builder = new Builder()

describe('int testing', () => {

 it('should return 200', async () => {
    const user = await builder.user()
    const res = await client.users.post('login', {email: user.email, password: 'password'})
    expect(res.status).toBe(201)

 })

})