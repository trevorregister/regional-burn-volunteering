const { Builder } = require('../builder')
const { AddLead } = require('../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('AddLead', () => {

    it('add user as team lead updates role, adds to team leads, adds team to user teams', async () => {
        const user = await builder.user()
        const team = await builder.team()

        const addLeadCase = AddLead(builder.teamRepo)
        await addLeadCase.execute(team._id, user._id)

        const retrievedTeam = await builder.teamRepo.getTeamById(team._id)
        const retrievedUser = await builder.userRepo.getUserById(user._id)
        
        expect(retrievedTeam.leads).toContainEqual(user._id)
        expect(retrievedUser.teams).toContainEqual(team._id)
        expect(retrievedUser.role).toEqual('lead')
    })
})