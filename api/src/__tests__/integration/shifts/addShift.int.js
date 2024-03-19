const builder = require('../../builder')
const request = require('../setup')

describe('Add Shift', () => {
    it('given a request with valid data from a lead, returns 201 and shift', async () =>{

        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const teamData = await builder.team({leads: [lead._id]})
        const shiftData = {
            name: builder.faker.lorem.word(6),
            description: builder.faker.lorem.sentence(2),
            teamId: teamData._id,
            start: builder.faker.date.past(),
            end: builder.faker.date.future(),
            capacity: builder.faker.number.int({min: 2, max: 5})
        }
        const res = await request.shifts.post('/', shiftData, token)
        expect(res.status).toBe(201)
        const {name, description, capacity} = res.body
        expect({
            name, 
            description, 
            capacity
        }).toEqual({
            name: shiftData.name,
            description: shiftData.description,
            capacity: shiftData.capacity
        })
    })

    it('given a request with valid data from an event-lead, returns 201 and shift', async () =>{

        const lead = await builder.user({role: 'event-lead'})
        const token = builder.token(lead)
        const teamData = await builder.team({leads: [lead._id]})
        const shiftData = {
            name: builder.faker.lorem.word(6),
            description: builder.faker.lorem.sentence(2),
            teamId: teamData._id,
            start: builder.faker.date.past(),
            end: builder.faker.date.future(),
            capacity: builder.faker.number.int({min: 2, max: 5})
        }
        const res = await request.shifts.post('/', shiftData, token)
        expect(res.status).toBe(201)
        const {name, description, capacity} = res.body
        expect({
            name, 
            description, 
            capacity
        }).toEqual({
            name: shiftData.name,
            description: shiftData.description,
            capacity: shiftData.capacity
        })
    })

    it('given a request with valid data from a lead from a different team, returns 403', async () =>{

        const lead = await builder.user({role: 'lead'})
        const team = await builder.team({leads: [lead._id]})
        const shiftTeam = await builder.team()
        const token = builder.token(lead)
        const shiftData = {
            name: builder.faker.lorem.word(6),
            description: builder.faker.lorem.sentence(2),
            teamId: shiftTeam._id,
            start: builder.faker.date.past(),
            end: builder.faker.date.future(),
            capacity: builder.faker.number.int({min: 2, max: 5})
        }
        const res = await request.shifts.post('/', shiftData, token)
        expect(res.status).toBe(403)
    })

    it('given a request with invalid data from a lead, returns 422', async () =>{
        const lead = await builder.user({role: 'lead'})
        const token = builder.token(lead)
        const teamData = await builder.team({leads: [lead._id]})
        const shiftData = {
            name: builder.faker.lorem.word(6),
            description: builder.faker.lorem.sentence(2),
            teamId: teamData._id,
            start: builder.faker.date.past(),
            end: builder.faker.date.future(),
            capacity: 0
        }
        const res = await request.shifts.post('/', shiftData, token)
        expect(res.status).toBe(422)
    })

    it('given a request from a non-lead, returns 403', async () =>{
        const user = await builder.user()
        const token = builder.token(user)
        const teamData = await builder.team()
        const shiftData = {
            name: builder.faker.lorem.word(6),
            description: builder.faker.lorem.sentence(2),
            teamId: teamData._id,
            start: builder.faker.date.past(),
            end: builder.faker.date.future(),
            capacity: builder.faker.number.int({min: 2, max: 5})
        }
        const res = await request.shifts.post('/', shiftData, token)
        expect(res.status).toBe(403)
    })
})
