const { Builder } = require('../../builder')
const client = require('../setup')

const builder = new Builder()

describe('getTeams', () => {

    it('given a request from an authenticated user, returns teams', async () =>{
        const user = await builder.user()
        const team = await builder.team()
        const loginRes = await client.users.post('/login', {email: user.email, password: 'password'})
        const { token } = loginRes.body
        const res = await client.teams.get('/', token)
        expect(res.status).toBe(200)
        expect(res.body[0].name).toBe(team.name)
    })
})