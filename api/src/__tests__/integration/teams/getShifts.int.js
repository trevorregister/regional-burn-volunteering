const builder = require('../../builder')
const request = require('../setup')

describe('Get Shifts', () => {
    it('given a request from authenticated user for a team, return 200 and team shifts', async () => {
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.teams.get(`/${team._id}/shifts`, token)
        expect(res.status).toBe(200)
        res.body.forEach(retrievedShift => {
            expect(retrievedShift.id).toEqual(shift._id.toString())
        })
    })
})