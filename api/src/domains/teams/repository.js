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

    async removeLead(id, userId){
        await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$pull: {leads: new ObjectId(userId)}})
    }

    async isLeadingAnyTeam(userId){
        return await this.db.findOne({leads: new ObjectId(userId)})
        ? true
        : false
    }

    async addLeadershipKeys(id, leadershipKeys){
        await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {leadershipKeys: leadershipKeys}})
    }

    async deleteLeadershipKey(leadershipKeyValue){
        const team = await this.db.findOne({"leadershipKeys.value": leadershipKeyValue})
        team.leadershipKeys = team.leadershipKeys.filter(leadershipKey => {
            return leadershipKey.value !== leadershipKeyValue 
            })
        await team.save()
    }

}