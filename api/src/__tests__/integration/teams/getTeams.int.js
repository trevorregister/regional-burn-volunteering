const request = require('../setup')
const builder = require('../../builder')

describe('Get Teams', () => {
    it('given a request from authenticated user, return 200 and all teams', async () => {
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const res = await request.teams.get('/', token)
        expect(res.status).toBe(200)
        res.body.forEach(retrievedTeam => {
            expect(retrievedTeam.id).toEqual(team._id.toString())
        })
    })
})