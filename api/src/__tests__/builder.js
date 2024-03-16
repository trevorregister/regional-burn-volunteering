const { build, perBuild } = require('@jackfranklin/test-data-bot')
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const UserDatabase = require ('../domains/users/data_access/database')
const ShiftDatabase = require ('../domains/shifts/data_access/database')    
const TeamDatabase = require ('../domains/teams/data_access/database')
const EventDatabase = require ('../domains/events/data_access/database')
const UserRepository = require('../domains/users/repository')
const ShiftRepository = require('../domains/shifts/repository')
const TeamRepository = require('../domains/teams/repository')
const EventRepository = require('../domains/events/repository')

const userDatabase = new UserDatabase()
const shiftDatabase = new ShiftDatabase()
const teamDatabase = new TeamDatabase()
const eventDatabase = new EventDatabase()
const userRepository = new UserRepository(userDatabase)
const shiftRepository = new ShiftRepository(shiftDatabase)
const teamRepository = new TeamRepository(teamDatabase)
const eventRepository = new EventRepository(eventDatabase)


faker.seed(123)

const userBuilder = build({
    name: 'User',
    fields: {
        _id: perBuild(() => new ObjectId()),
        name: perBuild(() => faker.person.fullName()),
        email: perBuild(() => faker.internet.email()),
        hash: '$2b$10$0k888.GCzQolvjeD8JRntu8eYdi.GpGY0z3qytVal7HCTLNpTMJee', //password is the password
        role: 'user',
        shifts: [],
        events: [],
        teams: []
    },
})

const teamBuilder = build({
    name: 'Team',
    fields: {
        _id: perBuild(() => new ObjectId()),
        name: perBuild(() => faker.lorem.word(2)),
        description: perBuild(() => faker.lorem.sentence()),
        members: [],
        leads: [],
        shifts: [],
        leadershipKeys: [],
    }

})

const shiftBuilder = build({
    name: 'Shift',
    fields: {
        _id: perBuild(() => new ObjectId()),
        name: perBuild(() => faker.lorem.word(2)),
        description: perBuild(() => faker.lorem.sentence()),
        team: perBuild(() => new ObjectId()),
        members: [],
        start: perBuild(() => faker.date.past()),
        end: perBuild(() => faker.date.future()),
        capacity: perBuild(() => faker.number.int(2, 5)),
        signups: 0,
        duration: 1
    }, 
    postBuild: (shift) => {
        let past = new Date(shift.start)
        let future = new Date(shift.end)
        past.setSeconds(0)
        past.setMinutes(0)
        future.setSeconds(0)
        future.setMinutes(0) 
        shift.start = past
        shift.end = future
        shift.duration = Math.abs(shift.end - shift.start) / 36e5
        return shift
    }

})

function applyOverrides(builderInstance, overrides) {
    for (const key in overrides) {
        if (overrides.hasOwnProperty(key)) {
            builderInstance[key] = overrides[key];
        }
    }
}

function createBuilderMethod(builder, db){
    return function(overrides = {}) {
        const builderInstance = builder.one(overrides)
        applyOverrides(builderInstance, overrides)
        return db.create(builderInstance)
    }
}

class Builder {
    constructor(){
        this.userDb = userDatabase
        this.teamDb = teamDatabase
        this.shiftDb = shiftDatabase
        this.eventDb = eventDatabase
        this.userRepo = userRepository
        this.teamRepo = teamRepository
        this.shiftRepo = shiftRepository
        this.eventRepo = eventRepository
        this.faker = faker
        this.user = createBuilderMethod(userBuilder, userDatabase)
        this.team = createBuilderMethod(teamBuilder, teamDatabase)
        this.shift = createBuilderMethod(shiftBuilder, shiftDatabase)
    }
    randomId(){
        return new mongoose.Types.ObjectId()
    }
}

module.exports = {
    Builder
}