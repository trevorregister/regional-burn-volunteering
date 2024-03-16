const { Builder } = require('../builder')
const { AddUser } = require('../../domains/users/use-cases/_index')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

const build = new Builder()

describe('AddUser', () => {

    it('create new user returns user', async () => {
        const user = {
            name: build.faker.person.fullName(),
            email: build.faker.internet.email(),
            password: build.faker.internet.password(),
            role: 'user',
            leadershipKeyValue: ' ' //need to fix the use case to not require this
        }
        const addUserCase = AddUser(build.userRepo)
        const newUser = await addUserCase.execute(user)
        const { name, email, role } = newUser
        expect({
            name,
            email,
            role
        }).toEqual({
            name: user.name,
            email: user.email,
            role: user.role
        })
    })

    it('create new lead with invalid leadership key value returns 400', async () => {
        const user = {
            name: build.faker.person.fullName(),
            email: build.faker.internet.email(),
            password: build.faker.internet.password(),
            role: 'user',
            leadershipKeyValue: build.faker.lorem.word(8)
        }
        try{
            const addUserCase = AddUser(build.userRepo)
            await addUserCase.execute(user)
        }
        catch(err){
            expect(err.code).toBe(400)
        }
    })
    
    it('create user with duplicate email returns 400', async () => {
        const user = await build.user()
        const newUser = {
            name: build.faker.person.fullName(),
            email: user.email,
            password: build.faker.internet.password(),
            role: 'user'
        }

        try{
            const addUserCase = AddUser(build.userRepo)
            await addUserCase.execute(newUser)
        }
        catch(err){
            expect(err.code).toBe(400)
        }
    })
})