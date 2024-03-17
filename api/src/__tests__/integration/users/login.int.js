const request = require('../setup')
const { Builder } = require('../../builder')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const builder = new Builder()

describe('login', () => {

    it('given correct credentials, return 201, valid token, and user', async () => {
    const userToLogin = await builder.user()
    const res = await request.users.post('/login', {email: userToLogin.email, password: 'password'})
    const { token, user } = res.body

    expect(res.status).toBe(201)
    expect(token).toBeDefined()
    expect(userToLogin.email).toEqual(user.email)

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    expect(verified.id).toEqual(user.id)

    })

    it('given incorrect credentials for existing account, return 401', async () => {
        const userToLogin = await builder.user()
        try {
            await request.users.post('/login', {email: userToLogin.email, password: '12345'})
        }
        catch(err){
            expect(err.code).toBe(401)
        }

    })

    it('given credentials for non-existent account, return 401', async () => {
        try {
            await request.users.post('/login', {email: builder.faker.internet.email(), password: '12345'})
        }
        catch(err){
            expect(err.code).toBe(401)
        }
    })
})