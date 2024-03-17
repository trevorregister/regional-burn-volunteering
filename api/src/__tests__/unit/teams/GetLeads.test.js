const builder = require('../../builder')
const { GetLeads } = require('../../../domains/teams/use-cases/_index')

describe('GetLeads', () => {
    
        it('get leads for specified team', async () => {
            const user = await builder.user()
            const team = await builder.team({leads: [user._id]})
    
            const getLeadsCase = GetLeads(builder.teamRepo)
            const leads = await getLeadsCase.execute(team._id)
    
            expect(leads[0].toObject()).toEqual(user.toObject())
        })
})