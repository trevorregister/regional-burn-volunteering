const { Builder } = require('../../builder')
const { GetShifts } = require('../../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('GetShifts', () => {
    
        it('get shifts for specified team', async () => {
            const teamId = builder.randomId()
            const shift = await builder.shift({
                team: teamId
            })
            const team = await builder.team({
                _id: teamId,
                shifts: [shift._id]
            })
            
            const updatedShift = await builder.shiftDb.findOne({_id: shift._id})
            const getShiftsCase = GetShifts(builder.teamRepo)
            const shifts = await getShiftsCase.execute(team._id)

            expect(shifts[0]).toEqual(updatedShift.toObject())
        })

        it('get shifts for team with no shifts returns empty array', async () => {
            const team = await builder.team()
            const getShiftsCase = GetShifts(builder.teamRepo)
            const shifts = await getShiftsCase.execute(team._id)

            expect(shifts).toEqual([])
        })
})