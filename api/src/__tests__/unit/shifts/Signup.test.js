const builder = require('../../builder')
const { Signup } = require('../../../domains/shifts/use-cases/_index')

describe('Signup', () => {
    
        it('signup user to shift adds shift/team to user', async () => {
            const user = await builder.user()
            const shift = await builder.shift()
    
            const signupCase = Signup(builder.shiftRepo)
            await signupCase.execute(user._id, shift._id)
    
            const updatedShift = await builder.shiftRepo.getShiftById(shift._id)
            const { members, signups } = updatedShift

            const updatedUser = await builder.userRepo.getUserById(user._id)
            const { shifts, teams } = updatedUser
    
            expect(members).toContainEqual(user._id)
            expect(signups).toEqual(shift.signups+1)
            expect({
                shifts,
                teams
            }).toEqual({
                shifts: [shift._id],
                teams: [shift.team]
            })
        })

        it('signup to shift they already have, return 400', async () => {
            const user = await builder.user()
            const shift = await builder.shift({members: [user._id]})
    
            const signupCase = Signup(builder.shiftRepo)
            try {
                await signupCase.execute(user._id, shift._id)
            } catch (err) {
                expect(err.code).toEqual(400)
            }
        })

        it('signup to shift at capacity, return 400', async () => {
            const user = await builder.user()
            const num = builder.faker.number.int()
            const shift = await builder.shift({signups: num, capacity: num})
    
            const signupCase = Signup(builder.shiftRepo)
            try {
                await signupCase.execute(user._id, shift._id)
            } catch (err) {
                expect(err.code).toEqual(400)
            }
        })
})