const TeamDatabase = require('./teams/data_access/database')
const TeamRepository = require('./teams/repository')
const UserDatabase = require('./users/data_access/database')
const UserRepository = require('./users/repository')
const ShiftDatabase = require('./shifts/data_access/database')
const ShiftRepository = require('./shifts/repository')
const EventDatabase = require('./events/data_access/database')
const EventRepository = require('./events/repository')
const { GetTeamById, AddTeam, UpdateTeam } = require('./teams/use-cases/_index')
const { GetEventById, AddEvent, UpdateEvent } = require('./events/use-cases/_index')

const teamDatabase = new TeamDatabase()
const teamRepository = new TeamRepository(teamDatabase)
const userDatabase = new UserDatabase()
const userRepository = new UserRepository(userDatabase)
const shiftDatabase = new ShiftDatabase()
const shiftRepository = new ShiftRepository(shiftDatabase)
const eventDatabase = new EventDatabase()
const eventRepository = new EventRepository(eventDatabase)

class Service {
    constructor(repository){
        this.repository = repository
    }
}

class TeamService extends Service {
    constructor(repository){
        super(repository)
        this.repository = teamRepository
    }

    getTeamById(id) {
        return this.repository.getTeamById(id)
    }
}

class UserService extends Service {
    constructor(repository){
        super(repository)
        this.repository = userRepository 
    }

    getUserById(id){
        return this.repository.getUserById(id)
    }
}

class ShiftService extends Service{
    constructor(){
        this.repository = shiftRepository
    }

    getShiftById(id){
        return this.repository.getShiftById(id)
    }
}

class EventService extends Service{
    constructor(){
        this.repository = eventRepository
    }

    getEventById(id){
        return GetEventById(this.repository).execute(id)
    }

}

module.exports = {
    TeamService,
    UserService,
    ShiftService,
    EventService
}

