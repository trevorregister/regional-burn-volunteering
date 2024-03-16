const { Builder } = require('../builder')
const { GetTeams } = require('../../domains/users/use-cases/_index')

const builder = new Builder()

describe('GetTeams', () => {

    it('return user teams', async () => {
        const team = await builder.team()
        const user = await builder.user({teams: [team._id]})
        await builder.teamRepo.addMember(team._id, user._id)
        const getTeamsCase = GetTeams(builder.userRepo)
        const retrievedTeams = await getTeamsCase.execute(user._id)
        retrievedTeams.forEach(() => {
            expect(team.toObject()).toEqual({
                _id: team._id,
                name: team.name,
                description: team.description,
                members: team.members,
                leadershipKeys: team.leadershipKeys,
                leads: team.leads,
                shifts: team.shifts,
                __v: 0
            })
        })
    })

    it('user with no teams return empty array', async () => {
        const user = await builder.user()
        const getTeamsCase = GetTeams(builder.userRepo)
        const retrievedTeams = await getTeamsCase.execute(user._id)
        expect(retrievedTeams).toEqual([])
    })
})
