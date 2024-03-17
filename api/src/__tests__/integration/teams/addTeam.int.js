const builder = require('../../builder')
const request = require('../setup')

describe('Add Team', () => {
    it('given a request from an event-lead, return 201 and team', async () =>{
        const user = await builder.user({role: 'event-lead'})
        const token = builder.token(user)
        const teamData = {
            name: builder.faker.lorem.word(),
            description: builder.faker.lorem.sentence(2),
            leads: []
        }
        const res = await request.teams.post('/', teamData, token)
        expect(res.status).toBe(201)
        expect(res.body.name).toEqual(teamData.name)
        
    })

    it('given a request from a non-event-lead, returns 403', async () =>{
        const user = await builder.user()
        const token = builder.token(user)
        const teamData = {
            name: builder.faker.lorem.word(),
            description: builder.faker.lorem.sentence(2),
            leads: []
        }
        const res = await request.teams.post('/', teamData, token)
        expect(res.status).toBe(403)
    })
})