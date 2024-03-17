const builder = require('../../builder')
const { DeleteLeadershipKey } = require('../../../domains/teams/use-cases/_index')

describe('DeleteLeadershipKeys', () => {

    it('delete leadership keys for specified team', async () => {
        const leadershipKey = {
            value: builder.faker.lorem.word(8),
            isRedeemed: false,
            redeemedBy: null
        }

        const team = await builder.team({leadershipKeys: [leadershipKey]})

        const deleteLeadershipKeysCase = DeleteLeadershipKey(builder.teamRepo)
        await deleteLeadershipKeysCase.execute(team.leadershipKeys[0].value)
        const updatedTeam = await builder.teamRepo.getTeamById(team._id)

        expect(updatedTeam.leadershipKeys).toHaveLength(0)
    })
})