const { Builder } = require('../../builder')
const { GetShiftById } = require('../../../domains/shifts/use-cases/_index')

const builder = new Builder()

describe('GetShiftById', () => {

    it('get shift by id returns shift', async () => {
        const shift = await builder.shift()
        const getShiftByIdCase = GetShiftById(builder.shiftRepo)
        const retrievedShift = await getShiftByIdCase.execute(shift._id)

        expect(retrievedShift.toObject()).toEqual({
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