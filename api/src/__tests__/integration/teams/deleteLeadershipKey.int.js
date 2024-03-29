const builder = require('../../builder')
const request = require('../setup')

describe('Delete Leadership Key', () => {
    it('given a request from an event-lead, returns 204', async () =>{
        const leadershipKey = {
            value: builder.faker.lorem.word(8),
            isRedeemed: false,
            redeemedBy: null
        }
        const eventLead = await builder.user({role: 'event-lead'})
        const token = builder.token(eventLead)
        const team = await builder.team({leadershipKeys: [leadershipKey]})
        const res = await request.teams.post(`/delete-leadership-key`, {leadershipKeyValue: leadershipKey.value}, token)
        expect(res.status).toBe(204)
    })

    it('given a request from a non-event-lead, returns 403', async () =>{
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const res = await request.teams.post(`/delete-leadership-key`, {leadershipKeyValue: builder.faker.lorem.word(8)}, token)
        expect(res.status).toBe(403)
    })
})