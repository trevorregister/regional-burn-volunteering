const TeamDatabase = require('./teams/data_access/database')
const TeamRepository = require('./teams/repository')
const UserDatabase = require('./users/data_access/database')
const UserRepository = require('./users/repository')
const ShiftDatabase = require('./shifts/data_access/database')
const ShiftRepository = require('./shifts/repository')
const EventDatabase = require('./events/data_access/database')
const EventRepository = require('./events/repository')

const teamDatabase = new TeamDatabase()
const teamRepository = new TeamRepository(teamDatabase)
const userDatabase = new UserDatabase()
const userRepository = new UserRepository(userDatabase)
const shiftDatabase = new ShiftDatabase()
const shiftRepository = new ShiftRepository(shiftDatabase)
const eventDatabase = new EventDatabase()
const eventRepository = new EventRepository(eventDatabase)

const repositories = {
    teams: teamRepository,
    users: userRepository,
    shifts: shiftRepository,
    events: eventRepository
}

class Client {
    constructor(repositories){
        this.users = repositories.users
        this.teams = repositories.teams
        this.shifts = repositories.shifts
        this.events = repositories.events
    }
}

const client = new Client(repositories)

module.exports = client