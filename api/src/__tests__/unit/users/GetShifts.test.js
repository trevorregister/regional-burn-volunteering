const builder = require('../../builder')
const { GetShifts } = require('../../../domains/users/use-cases/_index')

describe('GetShifts', () => {

    it('return user shifts', async () => {
        const userId = builder.randomId()
        const team = await builder.team()
        const shift = await builder.shift({
            team: team._id, 
            members: [userId]
        })
        const user = await builder.user({
            _id: userId,
            teams: [team._id], 
            shifts: [shift._id]
        })
        
        const getShiftsCase = GetShifts(builder.userRepo)
        const retrievedShifts = await getShiftsCase.execute(user._id)
        retrievedShifts.forEach(() => {
            expect(shift.toObject()).toEqual({
                _id: shift._id,
                name: shift.name,
                description: shift.description,
                members: shift.members,
                team: shift.team,
                start: shift.start,
                end: shift.end,
                duration: shift.duration,
                capacity: shift.capacity,
                signups: shift.signups,
                __v: 0
            })
        
        })

    })

    it('user with not shifts return empty array', async () => {
        const user = await builder.user()
        const getShiftsCase = GetShifts(builder.userRepo)
        const retrievedShifts = await getShiftsCase.execute(user._id)
        expect(retrievedShifts).toEqual([])

    })
})