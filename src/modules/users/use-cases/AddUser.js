const User = require('../model')
const { UserError } = require('../errors')
const bcrypt = require('bcrypt')

module.exports = (repository) => {
    async function execute(name, email, role, password){
        const user = await repository.getUserByEmail(email)
        if(user) { throw new UserError(400,`${user.email}`, 'exists') }
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User(name, email, role, hash) 
        await repository.create(newUser)
    }
    return { execute }
}