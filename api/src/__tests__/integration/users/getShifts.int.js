const builder = require('../../builder')
const request = require('../setup')

describe('getShifts', () => {
    it('given request for themselves from authenticated user, returns 200 and their shifts', async () => {
        const shiftOneId = builder.randomId()
        const shiftTwoId = builder.randomId()
        const user = await builder.user({shifts: [shiftOneId, shiftTwoId]})
        const token = builder.token(user)
        const shiftOne = await builder.shift({_id: shiftOneId, members: [user._id]})
        const shiftTwo = await builder.shift({_id: shiftTwoId, members: [user._id]})

        const res = await request.users.get(`/${user._id}/shifts`, token)
        expect(res.status).toBe(200)
        expect(res.body.forEach(shift => {
            expect([shiftOne._id.toString(), shiftTwo._id.toString()])
            .toContainEqual(shift.id)
        }))

    })

    it('given request from user for a different user, returns 403', async () => {
        const user = await builder.user()
        const token = builder.token(user)
        const otherUser = await builder.user()
        const res = await request.users.get(`/${otherUser._id}/shifts`, token)
        expect(res.status).toBe(403)
    })

    it('given request from lead for a different user, returns 200 and their shifts', async () => {
        const shiftOneId = builder.randomId()
        const shiftTwoId = builder.randomId()
        const user = await builder.user({shifts: [shiftOneId, shiftTwoId]})
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const shiftOne = await builder.shift({_id: shiftOneId, members: [user._id]})
        const shiftTwo = await builder.shift({_id: shiftTwoId, members: [user._id]})
        

        const res = await request.users.get(`/${user._id}/shifts`, token)
        expect(res.status).toBe(200)
        expect(res.body.forEach(shift => {
            expect([shiftOne._id.toString(), shiftTwo._id.toString()])
            .toContainEqual(shift.id)
        }))
    })
})