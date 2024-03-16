const { Builder } = require('../builder')
const { GetShifts } = require('../../domains/users/use-cases/_index')

const builder = new Builder()

describe('GetShifts', () => {

    it('return user shifts', async () => {
        const team = await builder.team()
        const shift = await builder.shift({team: team._id})
        const user = await builder.user({teams: [team._id], shifts: [shift._id]})
        await builder.shiftRepo.addMember(shift._id, user._id)
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