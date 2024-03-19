const builder = require('../../builder')
const request = require('../setup')

describe('Get Shift By Id', () => {
    it('given a request from a user, returns 201 and shift', async () =>{     
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.get(`/${shift._id}`, token)
        expect(res.status).toBe(200)
        const {name, description, capacity, id} = res.body
        expect({
            id,
            name, 
            description, 
            capacity
        }).toEqual({
            id: shift._id.toHexString(),
            name: shift.name,
            description: shift.description,
            capacity: shift.capacity
        })
    })
})