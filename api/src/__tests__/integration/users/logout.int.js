const { Builder } = require('../../builder')
const request = require('../setup')

const builder = new Builder()

describe('logout', () => {

    it('given a logged in user, logging out clears cookie and returns 200', async () =>{
        const user = await builder.user()
        const loginRes = await request.users.post('/login', {email: user.email, password: 'password'})
        const logoutRes = await request.users.post('/logout')
        const cookie = logoutRes.headers['set-cookie'][0].split(';')[0]

        expect(logoutRes.status).toBe(200)
        expect(cookie).toEqual('authcookie=')

    })
    
})