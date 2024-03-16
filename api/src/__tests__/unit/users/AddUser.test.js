const { Builder } = require('../../builder')
const { AddUser } = require('../../../domains/users/use-cases/_index')

const builder = new Builder()

describe('AddUser', () => {

    it('create new user returns user', async () => {
        const user = {
            name: builder.faker.person.fullName(),
            email: builder.faker.internet.email(),
            password: builder.faker.internet.password(),
            role: 'user',
            leadershipKeyValue: ' ' //need to fix the use case to not require this
        }
        const addUserCase = AddUser(builder.userRepo)
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

    it('create new lead returns lead, redeems leadership key, adds lead to team leads', async () => {
        const team = await builder.team({leadershipKeys: [{
            value: builder.faker.lorem.word(8),
            isRedeemed: false,
            redeemedBy: null
        }]})

        const lead = {
            name: builder.faker.person.fullName(),
            email: builder.faker.internet.email(),
            password: builder.faker.internet.password(),
            role: 'user',
            leadershipKeyValue: team.leadershipKeys[0].value
        }

        const addUserCase = AddUser(builder.userRepo)
        const newLead = await addUserCase.execute(lead)

        const { name, email, role } = newLead
        expect({
            name,
            email,
            role
        }).toEqual({
            name: lead.name,
            email: lead.email,
            role: 'lead'
        })

        const updatedTeam = await builder.teamRepo.getTeamById(team._id)
        const { isRedeemed, redeemedBy } = updatedTeam.leadershipKeys[0]
        expect({
            isRedeemed,
            redeemedBy
        }).toEqual({
            isRedeemed: true,
            redeemedBy: newLead._id
        })
        expect(updatedTeam.leads).toContainEqual(newLead._id)
    })

    it('create new lead with invalid leadership key value returns 400', async () => {
        const user = {
            name: builder.faker.person.fullName(),
            email: builder.faker.internet.email(),
            password: builder.faker.internet.password(),
            role: 'user',
            leadershipKeyValue: builder.faker.lorem.word(8)
        }
        try{
            const addUserCase = AddUser(builder.userRepo)
            await addUserCase.execute(user)
        }
        catch(err){
            expect(err.code).toBe(400)
        }
    })
    
    it('create user with duplicate email returns 400', async () => {
        const user = await builder.user()
        const newUser = {
            name: builder.faker.person.fullName(),
            email: user.email,
            password: builder.faker.internet.password(),
            role: 'user'
        }

        try{
            const addUserCase = AddUser(builder.userRepo)
            await addUserCase.execute(newUser)
        }
        catch(err){
            expect(err.code).toBe(400)
        }
    })
})