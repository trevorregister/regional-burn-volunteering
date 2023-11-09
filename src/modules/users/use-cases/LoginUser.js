const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserError } = require('../errors')

module.exports = (repository) => {
    async function execute(email, password){
        const user = await repository.getUserByEmail(email)
        const match = await bcrypt.compare(password, user.hash)

        if(user && match){
            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
            return {user: user, token: token}
        }

        else throw new UserError(401, 'no account or bad credentials')

    }
    return { execute }
}