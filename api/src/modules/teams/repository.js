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

    async addMember(id, userId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$addToSet: {members: new ObjectId(userId)}})
    }

    async updateTeam(id, update){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update})
    }

    async addLead(id, userId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$addToSet: {leads: new ObjectId(userId)}})
    }

}