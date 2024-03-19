const builder = require('../../builder')
const request = require('../setup')

describe('Signup', () => {
    it('given a request from a user, returns 201 and shift', async () =>{     
        const user = await builder.user()
        const token = builder.token(user)
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.patch(`/${shift._id}/signup`, {userId: user._id}, token)
        expect(res.status).toBe(204)
    })

    it('given a request from one user to signup another, returns 403', async () =>{
        const userOne = await builder.user()
        const userOneToken = builder.token(userOne)
        const userTwo = await builder.user()
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const res = await request.shifts.patch(`/${shift._id}/signup`, {userId: userTwo._id}, userOneToken)
        expect(res.status).toBe(403)
    })
})