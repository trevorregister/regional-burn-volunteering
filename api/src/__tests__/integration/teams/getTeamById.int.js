const builder = require('../../builder')
const request = require('../setup')

describe('Get Team By Id', () => {
    it('given a request from authenticated user, return 200 and the team', async () => {
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const res = await request.teams.get(`/${team._id}`, token)
        expect(res.status).toBe(200)
        expect(res.body.id).toEqual(team._id.toString())
    })
})