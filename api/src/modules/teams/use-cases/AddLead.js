const Team = require('../model')
const { HttpError } = require('../../../config/errors')
const { UserService } = require('../../services')
const userService = new UserService()

module.exports = (repository) => {
    async function execute(id, userId){
        const user = await userService.getUserById(id)
        if(!user) {
            throw new HttpError(404, `user ${id} not found`)
        }
        return await repository.addLead(id, userId)
    }

    return { execute }
}