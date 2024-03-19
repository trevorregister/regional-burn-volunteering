const builder = require('../../builder')
const request = require('../setup')

describe('Unsignup', () => {
    it('given a request from a user, returns 204', async () =>{ 
        const shiftId = builder.randomId()    
        const user = await builder.user({shifts: [shiftId]})
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({
            _id: shiftId,
            team: team._id, 
            members: [user._id] 
        })
        const res = await request.shifts.patch(`/${shift._id}/unsignup`, {userId: user._id}, token)
        expect(res.status).toBe(204)
    })

    it('given a request from a user to unsignup another, returns 403', async () =>{
        const shiftId = builder.randomId()
        const userOne = await builder.user()
        const userOneToken = builder.token(userOne)
        const userTwo = await builder.user({shifts: [shiftId]})
        const team = await builder.team()
        const shift = await builder.shift({
            _id: shiftId,
            team: team._id,
            members: [userTwo._id]
        })
        const res = await request.shifts.patch(`/${shift._id}/unsignup`, {userId: userTwo._id}, userOneToken)
        expect(res.status).toBe(403)
    })

    it('given a request from a lead to unsignup a user from their team, returns 204' , async () =>{
        const shiftId = builder.randomId()
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const user = await builder.user({shifts: [shiftId]})
        const team = await builder.team({
            leads: [lead._id], 
            members: [user._id]
        })
        const shift = await builder.shift({
            _id: shiftId, 
            team: team._id, 
            members: [user._id]
        })
        const res = await request.shifts.patch(`/${shift._id}/unsignup`, {userId: user._id}, token)
        expect(res.status).toBe(204)
    })

    it('given a request from a lead to unsignup a user from another team, returns 403', async () =>{
        const shiftId = builder.randomId()
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const user = await builder.user({shifts: [shiftId]})
        const leadingTeam = await builder.team({leads: [lead._id]})
        const otherTeam = await builder.team({leads: [builder.randomId()]})
        const shift = await builder.shift({
            _id: shiftId, 
            team: otherTeam._id, 
            members: [user._id]
        })
        const res = await request.shifts.patch(`/${shift._id}/unsignup`, {userId: user._id}, token)
        expect(res.status).toBe(403)
    })

    it('given a request from an event-lead, return 204', async () =>{
        const shiftId = builder.randomId()
        const eventLead = await builder.user({role: 'event-lead'})
        const token = builder.token(eventLead)
        const user = await builder.user({shifts: [shiftId]})
        const team = await builder.team({
            leads: [builder.randomId()], 
            members: [user._id]
        })
        const shift = await builder.shift({
            _id: shiftId, 
            team: team._id, 
            members: [user._id]
        })
        const res = await request.shifts.patch(`/${shift._id}/unsignup`, {userId: user._id}, token)
        expect(res.status).toBe(204)
    })
})