const User = require('../model')
const { UserError } = require('../errors')

module.exports = (repository) => {
    async function execute(name, email, role, password){
        const user = await repository.getUserByEmail(email)
        if(user) { throw new UserError(400,`${user.email}`, 'exists') }
        const newUser = new User(name, email, role, password) 
        await repository.create(newUser)
    }
    return { execute }
}