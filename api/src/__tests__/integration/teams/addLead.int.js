const builder = require('../../builder')
const request = require('../setup')

describe('Add Lead', () => {
    it('given a request from an event-lead, returns 204', async () =>{
        const eventLead = await builder.user({role: 'event-lead'})
        const token = builder.token(eventLead)
        const team = await builder.team()
        const user = await builder.user()
        const res = await request.teams.patch(`/${team._id}/addLead`, {userId: user._id}, token)
        expect(res.status).toBe(204)
    })

    it('given a request from a non-event-lead, returns 403', async () =>{
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const res = await request.teams.patch(`/${team._id}/addLead`, {userId: user._id}, token)
        expect(res.status).toBe(403)
    })
})