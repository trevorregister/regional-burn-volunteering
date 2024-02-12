const { ObjectId } = require('mongodb')

module.exports = class UserRepository {
    constructor(database){
        this.db = database
    }

    async getUsers(){        
        return await this.db.find({})
    }
    async getUserByEmail(email){
        return await this.db.findOne({email: email})
    }

    async getUserById(id){
        return await this.db.findById({_id: new ObjectId(id) })
    }

    async addShift(id, shiftId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {shifts: new ObjectId(shiftId)}})
    }

    async removeShift(id, shiftId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$pull: {shifts: new ObjectId(shiftId)}})
    }

    async addTeam(id, teamId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$addToSet: {teams: new ObjectId(teamId)}})
    }

    async create(user){
        return await this.db.create(user)
    }

}