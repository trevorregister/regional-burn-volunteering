const builder = require('../../builder')
const { GetUserById } = require('../../../domains/users/use-cases/_index')

describe('GetUserById', () => {

    it('get user by id should return that user', async () => {
        const user = await builder.user()
        const getUserByIdCase = GetUserById(builder.userRepo)
        const retrievedUser = await getUserByIdCase.execute(user._id)

        expect(retrievedUser.toObject()).toEqual({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            hash: user.hash,
            __v: 0,
            events: [],
            shifts: user.shifts,
            teams: user.teams,
        })

    })
})