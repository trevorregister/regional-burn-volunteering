const { Builder } = require('../../builder')
const { GetMembers } = require('../../../domains/shifts/use-cases/_index')

const builder = new Builder()

describe('GetMembers', () => {

    it('get members of shift', async () => {
        const userOne = await builder.user()
        const userTwo = await builder.user()
        const shift = await builder.shift({members: [userOne._id, userTwo._id]})

        const getMembersCase = GetMembers(builder.shiftRepo)
        const members = await getMembersCase.execute(shift._id)

        members.forEach(member => {
            expect([userOne._id, userTwo._id]).toContainEqual(member._id)
        })
    })
})
