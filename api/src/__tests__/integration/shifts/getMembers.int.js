const { ObjectId } = require('mongodb')
const builder = require('../../builder')
const request = require('../setup')

describe('Get Shift Members', () => {
    it('given a request from a user, returns 403', async () =>{     
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.get(`/${shift._id}/members`, token)
        expect(res.status).toBe(403)
    })

    it('given a request from a lead, returns 200 and members', async () =>{     
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)

        const userOneId = builder.randomId()
        const userTwoId = builder.randomId()
        const shiftId = builder.randomId()
        const team = await builder.team({members: [userOneId, userTwoId]})
        const userOne = await builder.user({_id: userOneId})
        const userTwo = await builder.user({_id: userTwoId})
        const shift = await builder.shift({
            _id: shiftId, 
            team: team._id, 
            members: [userOneId, userTwoId]
        })
        const res = await request.shifts.get(`/${shift._id}/members`, token)
        expect(res.status).toBe(200)
        res.body.forEach(member => {
            expect(shift.members).toContainEqual(new ObjectId(member.id))
        })
        
    })

    it('given a request from a user, returns 403', async () =>{     
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.get(`/${shift._id}/members`, token)
        expect(res.status).toBe(403)
    })
})