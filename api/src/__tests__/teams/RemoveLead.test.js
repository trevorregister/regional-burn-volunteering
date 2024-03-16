const { Builder } = require('../builder')
const { RemoveLead } = require('../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('RemoveLead', () => {

    it('remove lead of single from team leads, changes role to user', async () => {
        const lead = await builder.user({role: 'lead'})
        const team = await builder.team({leads: [lead._id]})

        const removeLeadCase = RemoveLead(builder.teamRepo)
        await removeLeadCase.execute(team._id, lead)

        const updatedTeam = await builder.teamRepo.getTeamById(team._id)
        const updatedLead = await builder.userRepo.getUserById(lead._id)

        expect(updatedTeam.leads).toEqual([])
        expect(updatedLead.role).toEqual('user')
    })

    it('remove lead of multiple teams, leaves role as lead', async () => {
        const teamOneId = builder.randomId()   
        const teamTwoId = builder.randomId()
        const lead = await builder.user({
            role: 'lead',
            teams: [teamOneId, teamTwoId]
        })
        const teamOne = await builder.team({
            _id: teamOneId,
            leads: [lead._id]
        })
        const teamTwo = await builder.team({
            _id: teamTwoId,
            leads: [lead._id]
        })

        const removeLeadCase = RemoveLead(builder.teamRepo)
        await removeLeadCase.execute(teamOne._id, lead)

        const updatedTeamOne = await builder.teamRepo.getTeamById(teamOne._id)
        const updatedLead = await builder.userRepo.getUserById(lead._id)

        expect(updatedTeamOne.leads).toEqual([])
        expect(updatedLead.role).toEqual('lead')
        expect(updatedLead.teams).toContainEqual(teamTwo._id)
    })
})