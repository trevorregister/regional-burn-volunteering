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

    addMember(id, userId){
        return this.repository.addMember(id, userId)
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

    addShift(id, shiftId){
        return this.repository.addShift(id, shiftId)
    }

    removeShift(id, shiftId){
        return this.repository.removeShift(id, shiftId)

    }

    addTeam(id, teamId){
        return this.repository.addTeam(id, teamId)
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
        return this.repository.getEventById(id)
    }

}

module.exports = {
    TeamService,
    UserService,
    ShiftService,
    EventService
}

