const User = require('../model')
const { HttpError } = require('../../../config/errors')
const bcrypt = require('bcrypt')

module.exports = (repository) => {
    async function execute({name, email, role, password}){
        const user = await repository.getUserByEmail(email)
        if(user) { throw new HttpError(400,`${user.email}`, 'exists') }
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User(name, email, role, hash) 
        return await repository.create(newUser)
    }
    return { execute }
}