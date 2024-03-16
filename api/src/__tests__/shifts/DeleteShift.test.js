const { Builder } = require('../builder')
const { DeleteShift } = require('../../domains/shifts/use-cases/_index')

const builder = new Builder()

describe('DeleteShift', () => {

    it('delete shift from team, remove from all user shifts, remove team from user teams', async () => {
        const shiftId = builder.randomId()
        const teamId = builder.randomId()

        const user = await builder.user({
            shifts: [shiftId],
            teams: [teamId]
        })
        const team = await builder.team({
            _id: teamId,
            shifts: [shiftId]
        })
        const shift = await builder.shift({
            _id: shiftId,
            team: team._id, 
            members: [user._id]})

        const deleteShiftCase = DeleteShift(builder.shiftRepo)
        await deleteShiftCase.execute(shift._id)
        
        const deletedShift = await builder.shiftRepo.getShiftById(shift._id)
        const updatedUser = await builder.userRepo.getUserById(user._id)
        const updatedTeam = await builder.teamRepo.getTeamById(team._id)
        const { shifts, teams } = updatedUser

        expect(deletedShift).toBeNull()
        expect(shifts).toEqual([])
        expect(teams).toEqual([])
        expect(updatedTeam.shifts).toEqual([])   
    })

    it('delete shift from team, remove from all user shifts, leave team on user(lead) teams', async () => {
        const teamId = builder.randomId()
        const shiftId = builder.randomId()

        const user = await builder.user({
            teams: [teamId],
            shifts: [shiftId],
            role: 'lead'
        })
        const team = await builder.team({
            _id: teamId,
            leads: [user._id]
        })
        const shift = await builder.shift({
            _id: shiftId,
            team: team._id, 
            members: [user._id]
        })

        const deleteShiftCase = DeleteShift(builder.shiftRepo)
        await deleteShiftCase.execute(shift._id)

        const updatedUser = await builder.userRepo.getUserById(user._id)
        const { teams } = updatedUser

        expect(teams).toContainEqual(team._id)

    })

    it('delete shift from team, remove from all user shifts, leave team on user teams', async () => {
        const shiftToDeleteId = builder.randomId()
        const shiftToKeepId = builder.randomId()
        const teamId = builder.randomId()

        const user = await builder.user({
            teams: [teamId],
            shifts: [shiftToDeleteId, shiftToKeepId]
        })
        const team = await builder.team({
            _id: teamId,
            shifts: [shiftToKeepId, shiftToDeleteId]
        })
        const shiftToDelete = await builder.shift({
            team: team._id, 
            members: [user._id]
        })
        const shiftToKeep = await builder.shift({
            team: team._id, 
            members: [user._id]
        })

        const deleteShiftCase = DeleteShift(builder.shiftRepo)
        await deleteShiftCase.execute(shiftToDelete._id)

        const updatedUser = await builder.userRepo.getUserById(user._id)
        const { teams } = updatedUser

        expect(teams).toContainEqual(team._id)

    })

})