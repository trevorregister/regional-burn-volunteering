const { Builder } = require('../builder')
const { Unsignup } = require('../../domains/shifts/use-cases/_index')

const builder = new Builder()

describe('Unsignup', () => {
    it('unsignup user from shift removes shift/team from user', async () => {
        const shiftId = builder.randomId()
        const teamId = builder.randomId()

        const user = await builder.user({
            shifts: [shiftId],
            teams: [teamId]
        })
        const shift = await builder.shift({
            _id: shiftId,
            team: teamId,
            members: [user._id]
        })
        const team = await builder.team({
            _id: teamId, 
            members: [user._id]
        })

        const unsignupCase = Unsignup(builder.shiftRepo)
        await unsignupCase.execute(user._id, shift._id)

        const updatedShift = await builder.shiftRepo.getShiftById(shift._id)
        const { members, signups } = updatedShift

        const updatedUser = await builder.userRepo.getUserById(user._id)
        const { shifts, teams } = updatedUser

        expect(members).not.toContainEqual(user._id)
        expect(signups).toEqual(shift.signups-1)
        expect({
            shifts,
            teams
        }).toEqual({
            shifts: [],
            teams: []
        })
    })

    it('unsignup from one of two shifts on team, user still on team', async () => {
        const shiftOneId = builder.randomId()
        const shiftTwoId = builder.randomId()
        const teamId = builder.randomId()

        const user = await builder.user({
            shifts: [shiftOneId, shiftTwoId],
            teams: [teamId]
        })
        const shiftOne = await builder.shift({
            _id: shiftOneId,
            members: [user._id]
        })
        const shiftTwo = await builder.shift({
            _id: shiftTwoId,
            team: shiftOne.team, 
            members: [user._id]
        })
        const team = await builder.team({
            _id: teamId, 
            members: [user._id], 
            shifts: [shiftOne._id, shiftTwo._id]
        })

        const unsignupCase = Unsignup(builder.shiftRepo)
        await unsignupCase.execute(user._id, shiftOne._id)

        const updatedUser = await builder.userRepo.getUserById(user._id)
        const updatedTeam = await builder.teamRepo.getTeamById(team._id)
        const { teams } = updatedUser
        const { members } = updatedTeam

        expect(teams).toContainEqual(team._id)
        expect(members).toContainEqual(user._id)
    })

    it('unsignup from last shift on team, lead remains on team', async () => {
        const teamId = builder.randomId()
        const shiftId = builder.randomId()
        
        const lead = await builder.user({
            role: 'lead', 
            teams: [teamId],
            shifts: [shiftId]
        })
        const shift = await builder.shift({
            _id: shiftId, 
            team: teamId, 
            members: [lead._id]
        })
        const team = await builder.team({
            _id: teamId, 
            leads: [lead._id], 
            members: [lead._id]
        })

        const unsignupCase = Unsignup(builder.shiftRepo)
        await unsignupCase.execute(lead._id, shift._id)

        const updatedUser = await builder.userRepo.getUserById(lead._id)
        const updatedTeam = await builder.teamRepo.getTeamById(lead.teams[0])
        const { teams } = updatedUser
        const { members, leads } = updatedTeam

        expect(teams).toContainEqual(team._id)
        expect({
            members, 
            leads
        }).toEqual({
            members: [lead._id], 
            leads: [lead._id]
        })
    })

    it('unsignup from shift they are not on, return 400', async () => {
        const user = await builder.user()
        const shift = await builder.shift()

        const unsignupCase = Unsignup(builder.shiftRepo)
        try {
            await unsignupCase.execute(user._id, shift._id)
        } catch (err) {
            expect(err.code).toEqual(400)
        }
    })
})