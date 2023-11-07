module.exports = class UserRepository {
    constructor(database){
        this.db = database
    }

    async getUsers(){        
        return await this.db.find()
    }
    async getUserByEmail(email){
        return await this.db.findOne({email: email}) || undefined
    }
    

}