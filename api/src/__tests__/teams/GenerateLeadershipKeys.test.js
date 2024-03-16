const { Builder } = require('../builder')
const { GenerateLeadershipKeys } = require('../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('GenerateLeadershipKeys', () => {

    it('return unredeemed/null redeemedBy keys for specified team', async () => {
        const team = await builder.team()
        const quantity = 1
        const generateLeadershipKeysCase = GenerateLeadershipKeys(builder.teamRepo)
        const leadershipKeys = await generateLeadershipKeysCase.execute(team._id, quantity)
        const updatedTeam = await builder.teamRepo.getTeamById(team._id)
        updatedTeam.leadershipKeys.forEach( key =>{
            const { value, isRedeemed, redeemedBy } = key
            expect({
                value,
                isRedeemed,
                redeemedBy
            }).toEqual({
                value: leadershipKeys[0].value,
                isRedeemed: false,
                redeemedBy: null
            })

        })
    })
})