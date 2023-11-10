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

    async updateTeam(id, update){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update})
    }

}