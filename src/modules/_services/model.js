const TeamDatabase = require('../teams/data_access/database')
const TeamRepository = require('../teams/repository')

const teamDatabase = new TeamDatabase()
const teamRepository = new TeamRepository(teamDatabase)
const { GetTeamById, AddTeam, UpdateTeam } = require('../teams/use-cases/_index')

class Service {
    constructor(database, repository){
        getById()
        add()
        update()
    }
}

class TeamService extends Service {
    constructor(){
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

module.exports = {
    TeamService
}

