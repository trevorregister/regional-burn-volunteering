const builder = require('../../builder')
const request = require('../setup')

describe('getUserById', () => {

    it('given request for themselves from authenticated user, returns user and 200', async () => {
        const user = await builder.user()
        const token = builder.token(user)
        const res = await request.users.get(`/${user.id}`, token)
        expect(res.status).toBe(200)

    })

    it('given a request from an authenticated user for another user, returns 403', async () =>{
        try {
            const user = await builder.user()
            const token = builder.token(user)
            const differentUserId = builder.randomId()
            await request.users.get(`/${differentUserId}`, token)
        } catch (err) {
            expect(err.code).toEqual(403)
            
        }
    })

    it('given a request from an authenticated lead, returns user', async () =>{
        const lead = await builder.user({role: 'lead'})
        const user = await builder.user()
        const token = builder.token(user)
        const res = await request.users.get(`/${user.id}`, token)
        expect(res.status).toBe(200)
        expect(res.body.email).toBe(user.email)
        
    })

})