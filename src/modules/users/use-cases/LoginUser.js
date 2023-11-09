const bcrypt = require('bcrypt')
const { UserError } = require('../errors')

module.exports = (repository) => {
    async function execute(email, password){
        const user = await repository.getUserByEmail(email)
        if(!user) { throw new UserError(400,`${user.email} `, 'not found') }
        const match = await bcrypt.compare(password, user.hash)
        if(!match) { throw new UserError(401, 'no account or incorrect credentials')}
        return match
    }
    return { execute }
}