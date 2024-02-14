const Team = require('../model')
const { HttpError } = require('../../../config/errors')
const { UserService } = require('../../services')
const userService = new UserService()

module.exports = (repository) => {
    async function execute(id, userId){
        const user = await userService.getUserById(userId)
        if(!user) {
            throw new HttpError(404, `user ${id} not found`)
        }

        return Promise.all([
            await repository.addLead(id, userId),
            await userService.updateRole(userId, 'lead')
        ])
    }

    return { execute }
}