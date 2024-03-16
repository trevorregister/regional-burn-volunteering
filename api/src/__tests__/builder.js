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
        hash: '$2b$10$0k888.GCzQolvjeD8JRntu8eYdi.GpGY0z3qytVal7HCTLNpTMJee',
        role: 'user',
        shifts: [],
        events: [],
        teams: []
    },
})

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
    }
    randomId(){
        return new mongoose.Types.ObjectId()
    }
    user(overrides = {}){
        const user = userBuilder.one({overrides})
        if(overrides.shifts){
            user.shifts = [...overrides.shifts]
        }
        if(overrides.teams){
            user.teams = [...overrides.teams]
        }
        return this.userDb.create(user)
    }

}

module.exports = {
    Builder
}