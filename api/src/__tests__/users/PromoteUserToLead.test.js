const { Builder } = require('../builder')
const { PromoteUserToLead } = require('../../domains/users/use-cases/_index')

const builder = new Builder()

describe('PromoteUserToLead', () => {

    it('promote user to lead should return that user', async () => {
        const user = await builder.user()
        const team = await builder.team()
        const promoteUserToLeadCase = PromoteUserToLead(builder.userRepo)
        await promoteUserToLeadCase.execute(user._id, team._id)
        const updatedUser = await builder.userRepo.getUserById(user._id)
        const updatedTeam = await builder.teamRepo.getTeamById(team._id)

        expect(updatedUser.toObject()).toEqual({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: 'lead',
            hash: user.hash,
            __v: 0,
            events: [],
            shifts: user.shifts,
            teams: [team._id],
        })

        expect(updatedTeam.toObject()).toEqual({
            _id: team._id,
            name: team.name,
            description: team.description,
            leads: [user._id],
            members: [user._id],
            leadershipKeys: team.leadershipKeys,
            shifts: team.shifts,
            __v: 0
        })

    })
})