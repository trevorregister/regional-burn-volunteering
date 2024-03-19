const builder = require('../../builder')
const request = require('../setup')

describe('Delete Shift', () => {
    it('given a request from a user, returns 403', async () =>{     
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.delete(`/${shift._id}`, token)
        expect(res.status).toBe(403)
    })

    it('given a request from a lead, returns 204', async () =>{     
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const team = await builder.team({leads: [lead._id]})
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.delete(`/${shift._id}`, token)
        expect(res.status).toBe(204)
    })

    it('given a request from a lead to delete a shift from another team, returns 403', async () =>{     
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const team = await builder.team({leads: [builder.randomId()]})
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.delete(`/${shift._id}`, token)
        expect(res.status).toBe(403)
    })

    it('given a request from an event lead, returns 204', async () =>{     
        const lead = await builder.user({role: 'event-lead'})
        const token = builder.token(lead)
        const team = await builder.team({leads: [builder.randomId()]})
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.delete(`/${shift._id}`, token)
        expect(res.status).toBe(204)
    })
})