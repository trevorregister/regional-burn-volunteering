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

    async addTeam(id, teamId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$addToSet: {teams: new ObjectId(teamId)}})
    }

    async removeShift(id, shiftId){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$pull: {shifts: new ObjectId(shiftId)}})
    }

    async updateRole(id, role){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {role: role})
    }

    async deleteUser(id){
        return await this.db.findByIdAndDelete(id) //findByIdAndDelete assumes an ObjectId is being passed. id here doesn't come from a string like it does in other repo calls.
    }

    async create(user){
        return await this.db.create(user)
    }

    async promoteUserToLead(id){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: {role: 'lead'}})
    }

    async getLeads(idArray){
        const userObjectIds = []
        idArray.map(id => {
            if (typeof id === String){//possible that this could take in an array of strings in the future, but currently it's not being used that way.
                userObjectIds.push(new ObjectId(id))
            }
            else {
                userObjectIds.push(id)
            }
        })
        return await this.db.find({_id: {$in: userObjectIds}})
    }

    async getShifts(id){
        id = new ObjectId(id)
        const shifts = await this.db.aggregate([
            {
              $match:
                {
                  _id: id,
                },
            },
            {
                $lookup: {
                    from: 'shifts',
                    localField: 'shifts',
                    foreignField: '_id',
                    as: 'shifts'
                }
            }
          ])
          .project(
            {
                shifts: 1,
                _id: 0,
            }
          )
        shifts[0].shifts.sort( (i, j) => i.start > j.start ? 1 : -1)
        return shifts[0].shifts
    }

    async getTeams(id){
        id = new ObjectId(id)
        const teams = await this.db.aggregate([
            {
              $match:
                {
                  _id: id,
                },
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'teams',
                    foreignField: '_id',
                    as: 'teams'
                }
            },

          ])
          .project(
            {
                teams: 1,
                _id: 0,
            }
          )
        return teams[0].teams
    }

}