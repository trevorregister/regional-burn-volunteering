const { Builder } = require('../../builder')
const { GetLeads } = require('../../../domains/teams/use-cases/_index')

const builder = new Builder()

describe('GetLeads', () => {
    
        it('get leads for specified team', async () => {
            const user = await builder.user()
            const team = await builder.team({leads: [user._id]})
    
            const getLeadsCase = GetLeads(builder.teamRepo)
            const leads = await getLeadsCase.execute(team._id)
    
            expect(leads[0].toObject()).toEqual(user.toObject())
        })
})