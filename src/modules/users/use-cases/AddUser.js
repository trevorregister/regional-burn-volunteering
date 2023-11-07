const User = require('../model')

module.exports = (repository) => {
    async function execute(name, email, role, password){
        const user = await repository.getUserByEmail(email)
        if(user) { throw new Error(`user with email ${email} exists`) }
        const newUser = new User(name, email, role, password) 
        await repository.create(newUser)
    }
    return { execute }
}