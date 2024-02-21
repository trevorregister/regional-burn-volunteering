const { HttpError } = require('../../../config/errors')
const { UserService } = require('../../services')
const userService = new UserService()

module.exports = (repository) => {
    async function execute(id, userId){
        const user = await userService.getUserById(userId)
        if(!user) {
            throw new HttpError(404, `user ${id} not found`)
        }
        await repository.removeLead(id, userId)
        const isLeadingAnyTeam = await repository.isLeadingAnyTeam(userId)
        if(!isLeadingAnyTeam){
            await userService.updateRole(userId, 'user')
        }

    }

    return { execute }
}