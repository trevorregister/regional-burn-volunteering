const { ObjectId } = require('mongodb')

module.exports = class ShiftRepository {
    constructor(database){
        this.db = database
    }

    async getShiftById(id){
        return await this.db.findById({_id: new ObjectId(id) })
    }

    async create(shift){
        shift.teamId = new ObjectId(shift.teamId)
        return await this.db.create(shift)
    }

    async incrementShift(id){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$inc: {signups: 1}})
    }

    async decrementShift(id){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$inc: {signups: -1}})
    }

    async addMember(id, userId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {members: new ObjectId(userId)}})
    }

    async removeMember(id, userId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$pull: {members: new ObjectId(userId)}})
    }

    async isShiftConflict(userId, start, end){
        return await this.db.findOne({
            "members": new ObjectId(userId),
            $and: [{
                start: {$gte: start},
                end: {$lte: end}
            }]
        })
        ? true
        : false
    }

    async updateShift(id, update){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update})
    }

    async deleteShift(id){
        return await this.db.findOneAndDelete({_id: new ObjectId(id)})
    }

    async getMembers(id){
        const members =  await this.db.aggregate([
            {
                $match:
                {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members"
                }
            },
            {
                $project:
                {
                    members: 1,
                    _id: 0
                }
            },
        ])
        return members[0].members.sort((a, b) => a.name.localeCompare(b.name))
    }

    async getShiftsByTeam(teamId){
        return await this.db.aggregate([
            {
                $match:
                {
                    team: new ObjectId(teamId)
                }
            },
            {
                $sort:
                {
                    start: 1
                }
            }
        ])
    }

}