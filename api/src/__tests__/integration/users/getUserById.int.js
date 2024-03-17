const { Builder } = require('../../builder')
const client = require('../setup')

const builder = new Builder()

describe('getUserById', () => {

    it('given a request from an authenticated user, returns 403', async () =>{
        try {
            const user = await builder.user()
            const loginRes = await client.users.post('/login', {email: user.email, password: 'password'})
            const { token } = loginRes.body
            await client.users.get(`${user.id}`, token)
        } catch (err) {
            expect(err.code).toEqual(403)
            
        }
    })

    it('given a request from an authenticated lead, returns user', async () =>{
        const lead = await builder.user({role: 'lead'})
        const user = await builder.user()
        const loginRes = await client.users.post('/login', {email: user.email, password: 'password'})
        const { token } = loginRes.body
        const res = await client.users.get(`/${user.id}`, token)
        expect(res.status).toBe(200)
        expect(res.body.email).toBe(user.email)
        
    })
})