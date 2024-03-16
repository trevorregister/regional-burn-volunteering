const { Builder } = require('../../builder')
const { AddShift } = require('../../../domains/shifts/use-cases/_index')

const builder = new Builder()

describe('AddShift', () => {

    it('add shift to team', async () => {
        const shiftTeam = await builder.team()
        let shiftStart = builder.faker.date.past()
        shiftStart.setSeconds(0)
        shiftStart.setMinutes(0)
        shiftStart.setMilliseconds(0)
        let shiftEnd = builder.faker.date.future()
        shiftEnd.setSeconds(0)
        shiftEnd.setMinutes(0)
        shiftEnd.setMilliseconds(0)
        
        const shiftData = {
            name: builder.faker.lorem.word(2),
            description: builder.faker.lorem.sentence(2),
            teamId: shiftTeam._id,
            start: shiftStart,
            end: shiftEnd,
            capacity: builder.faker.number.int({min: 2, max: 5})
        }
        const addShiftCase = AddShift(builder.shiftRepo)
        const shift = await addShiftCase.execute(shiftData)
        const { name, description, team, start, end, capacity, duration, signups } = shift
        expect(true).toBe(true)
        expect({
            name, 
            description, 
            team, 
            start, 
            end, 
            capacity,
            duration,
            signups
        }).toEqual({
            name: shiftData.name,
            description: shiftData.description,
            team: shiftData.teamId,
            start: shiftData.start,
            end: shiftData.end,
            capacity: shiftData.capacity,
            duration: Math.abs(shiftData.end - shiftData.start) / 36e5,
            signups: 0
        })
    })
})