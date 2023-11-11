const TeamDatabase = require('./teams/data_access/database')
const TeamRepository = require('./teams/repository')
const UserDatabase = require('./users/data_access/database')
const UserRepository = require('./users/repository')
const ShiftDatabase = require('./shifts/data_access/database')
const ShiftRepository = require('./shifts/repository')
const { GetTeamById, AddTeam, UpdateTeam } = require('./teams/use-cases/_index')
const { GetUserById, LoginUser, GetUsers } = require('./users/use-cases/_index')
const { GetShiftById, AddShift, UpdateShift } = require('./shifts/use-cases/_index')

const teamDatabase = new TeamDatabase()
const teamRepository = new TeamRepository(teamDatabase)
const userDatabase = new UserDatabase()
const userRepository = new UserRepository(userDatabase)
const shiftDatabase = new ShiftDatabase()
const shiftRepository = new ShiftRepository(shiftDatabase)

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
        return GetTeamById(this.repository).execute(id)
    }

    addTeam(name, description){
        return AddTeam(this.repository).execute(name, description)
    }

    updateTeam(id, update){
        return UpdateTeam(this.repository).execute(id, update)
    }
}

class UserService {
    constructor(){
        this.repository = userRepository 
    }

    getUserById(id){
        return GetUserById(this.repository).execute(id)
    }

    addUser(name, email, role, password){
        return AddUser(this.repository).execute(name, email, role, password)
    }

    loginUser(email, password){
        return LoginUser(this.repository).execute(email, password)
    }

    getUsers(){
        return GetUsers(this.repository).execute()
    }
}

class ShiftService {
    constructor(){
        this.repository = shiftRepository
    }

    getShiftById(id){
        return GetShiftById(this.repository).execute(id)
    }

    addShift(name, description, teamId, start, end, capacity){
        return AddShift(this.repository).execute(name, description, teamId, start, end, capacity)
    }

    updateShift(id, update){
        return UpdateShift(this.repository).execute(id, update)
    }
}

module.exports = {
    TeamService,
    UserService,
    ShiftService
}

