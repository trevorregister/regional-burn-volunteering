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

    async updateShift(id, update){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update})
    }

}