const { Builder } = require('../../builder')
const client = require('../setup')

const builder = new Builder()

describe('logout', () => {

    it('given a logged in user, logging out clears cookie and returns 200', async () =>{
        const user = await builder.user()
        const loginRes = await client.users.post('login', {email: user.email, password: 'password'})
        const logoutRes = await client.users.post('logout')
        const cookie = logoutRes.headers['set-cookie'][0].split(';')[0]

        expect(logoutRes.status).toBe(200)
        expect(cookie).toEqual('authcookie=')

    })
    
})