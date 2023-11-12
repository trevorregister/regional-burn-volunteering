const { ObjectId } = require('mongodb')

module.exports = class EventRepository {
    constructor(database){
        this.db = database
    }

    async getEventById(id){
        return await this.db.findById({_id: new ObjectId(id) })
    }

    async create(event){
        return await this.db.create(event)
    }

    async updateEvent(id, update){
        return await this.db.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update})
    }

}