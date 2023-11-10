const { ObjectId } = require('mongodb')

module.exports = class TeamRepository {
    constructor(database){
        this.db = database
    }

    async getTeams(){        
        return await this.db.find({})
    }

    async getTeamById(id){
        return await this.db.findById({_id: new ObjectId(id) })
    }

    async create(team){
        return await this.db.create(team)
    }

}