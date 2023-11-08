const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()

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
        user.hash = await bcrypt.hash(user.hash.concat(process.env.PEPPER), 10)
        return await this.db.create(user)
    }
    

}