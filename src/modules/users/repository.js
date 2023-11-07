const { ObjectId } = require('mongodb')

module.exports = class UserRepository {
    constructor(database){
        this.db = database
    }

    async getUsers(){        
        return await this.db.find()
    }
    async getUserByEmail(email){
        return await this.db.findOne({email: email})
    }

    async getUserById(id){
        return await this.db.findOne({_id: new ObjectId(id) })
    }

    async create(user){
        return await this.db.create(user)
    }
    

}