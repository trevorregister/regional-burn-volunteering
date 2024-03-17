const builder = require('../../builder')
const { LoginUser } = require('../../../domains/users/use-cases/_index')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

describe('LoginUser', () => {

    it('successful login should return user and token', async () => {
        const user = await builder.user()
        const loginUserCase = LoginUser(builder.userRepo)
        const login = await loginUserCase.execute(user.email, 'password')
        const verified = jwt.verify(login.token, process.env.JWT_SECRET)

        expect(login.user.toObject()).toEqual({
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
        expect(login.token).toBeDefined()
        expect(verified.id).toEqual(user._id.toString())

    })

    it('unsuccessful login should return 401', async () => {
        try{
            const user = await builder.user()
            const loginUserCase = LoginUser(builder.userRepo)
            await loginUserCase.execute(user.email, 'asdf')
        } catch(err){
            expect(err.code).toBe(401)
        }

    })
})