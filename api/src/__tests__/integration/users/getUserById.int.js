const { Builder } = require('../../builder')
const request = require('../setup')

const builder = new Builder()

describe('getUserById', () => {

    it('given a request from an authenticated user, returns 403', async () =>{
        try {
            const user = await builder.user()
            const loginRes = await request.users.post('/login', {email: user.email, password: 'password'})
            const { token } = loginRes.body
            await request.users.get(`${user.id}`, token)
        } catch (err) {
            expect(err.code).toEqual(403)
            
        }
    })

    it('given a request from an authenticated lead, returns user', async () =>{
        const lead = await builder.user({role: 'lead'})
        const user = await builder.user()
        const loginRes = await request.users.post('/login', {email: user.email, password: 'password'})
        const { token } = loginRes.body
        const res = await request.users.get(`/${user.id}`, token)
        expect(res.status).toBe(200)
        expect(res.body.email).toBe(user.email)
        
    })
})