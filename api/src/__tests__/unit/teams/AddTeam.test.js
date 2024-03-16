const { Builder } = require('../../builder')
const { AddTeam } = require('../../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('AddTeam', () => {

    it('create new team returns team', async () => {
        const teamData = {
            name: builder.faker.lorem.word(2),
            description: builder.faker.lorem.sentence(2),
            leads: []
        }
        const addTeamCase = AddTeam(builder.teamRepo)
        const team = await addTeamCase.execute(teamData)
        const { name, description, leads } = team
        expect({
            name,
            description,
            leads
        }).toEqual({
            name: teamData.name,
            description: teamData.description,
            leads: teamData.leads
        })
    })
})