const builder = require('../../builder')
const request = require('../setup')


describe('getTeams', () => {

    it('given a request from an authenticated user, returns teams', async () =>{
        const user = await builder.user()
        const team = await builder.team()
        const token = builder.token(user)
        const res = await request.teams.get('/', token)
        expect(res.status).toBe(200)
        expect(res.body[0].name).toBe(team.name)
    })
})