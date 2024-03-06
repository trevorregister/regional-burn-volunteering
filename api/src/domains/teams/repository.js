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

    async removeMember(userId){
        return await this.db.findOneAndUpdate({members: new ObjectId(userId)}, {$pull: {members: new ObjectId(userId)}})
    }

    async updateTeam(id, update){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update})
    }

    async addLead(id, userId){
        id = new ObjectId(id)
        userId = new ObjectId(userId)
        return await this.db.updateOne(
            {
                _id: id
            },
            {
                $addToSet: {
                    leads: userId,
                    members: userId
                },
            } 
        )
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
        if(!team) {
            return false
        }
        team.leadershipKeys = team.leadershipKeys.filter(leadershipKey => {
            return leadershipKey.value !== leadershipKeyValue 
            })
        return await team.save()
    }

    async redeemLeadershipKey(leadershipKeyValue, userId){
        const team = await this.db.findOne({"leadershipKeys.value": leadershipKeyValue})
        if(!team) {
            return false
        }

        const isRedeemedCheck = team.leadershipKeys.filter(key => {
            return (key.value === leadershipKeyValue) && (key.isRedeemed) === false
        })

        if(isRedeemedCheck.length === 0){
            return false
        }

        team.leadershipKeys.map(leadershipKey => {
            if(leadershipKey.value === leadershipKeyValue){
                leadershipKey.isRedeemed = true
                leadershipKey.redeemedBy = new ObjectId(userId)
            }
        })
        return await team.save()
    }

}