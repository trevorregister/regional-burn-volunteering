const { Builder } = require('../builder')
const { GetTeamById } = require('../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('GetTeamById', () => {

    it('get team by id returns team', async () => {
        const team = await builder.team() 
        const getTeamByIdCase = GetTeamById(builder.teamRepo)
        const retrievedTeam = await getTeamByIdCase.execute(team._id) 

        expect(retrievedTeam.toObject()).toEqual({
            _id: team._id,
            name: team.name,
            description: team.description,
            members: team.members,
            leads: team.leads,
            leadershipKeys: team.leadershipKeys,
            shifts: team.shifts,
            __v: 0
        })

    })
})
