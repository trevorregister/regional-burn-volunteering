const builder = require('../../builder')
const request = require('../setup')

describe('Generate Leadership Keys', () => {
    it('given a request from an event-lead, returns keys and 201', async () =>{
        const eventLead = await builder.user({role: 'event-lead'})
        const token = builder.token(eventLead)
        const quantity = builder.faker.number.int({min: 2, max: 5})
        const team = await builder.team()
        const res = await request.teams.post(`/${team._id}/generate-leadership-keys`, {quantity: quantity}, token)
        expect(res.status).toBe(201)
        expect(res.body.length).toBe(quantity)
    })

    it('given a request from a non-event-lead, returns 403', async () =>{
        const user = await builder.user()
        const token = builder.token(user)
        const quantity = builder.faker.number.int({min: 2, max: 5})
        const team = await builder.team()
        const res = await request.teams.post(`/${team._id}/generate-leadership-keys`, {quantity: quantity}, token)
        expect(res.status).toBe(403)
    })
})