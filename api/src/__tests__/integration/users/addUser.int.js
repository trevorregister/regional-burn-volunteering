const { Builder } = require('../../builder')
const client = require('../setup')

const builder = new Builder()

describe('addUser', () => {
    
    it('given valid inputs, returns new user and 201', async () =>{
        const userData = {
            email: builder.faker.internet.email(),
            password: 'password',
            name: builder.faker.person.fullName(),
            leadershipKeyValue: ' ' //required because of a current bug
        }
        const res = await client.users.post('/',userData)
        expect(res.status).toBe(201)
        expect(res.body.email).toBe(userData.email.toLowerCase())
    })

    it('given missing required inputs, returns 422', async () => {
        try {
            const userData = {
                password: 'password',
                name: builder.faker.person.fullName()
            }
            await client.users.post('/',userData)
        } catch (err) {
            expect(err.status).toBe(422)
        }
    })

    it('given invalid leadership key value, returns 422 and error message', async () => {
        try {
            const userData = {
                email: builder.faker.internet.email(),
                password: 'password',
                name: builder.faker.person.fullName(),
                leadershipKeyValue: 'invalid'
            }
            await client.users.post('/',userData)
        } catch (err) {
            expect(err.status).toBe(422)
            expect(err.response.body.message).toBe('leadership key value error')
        }
    })
})