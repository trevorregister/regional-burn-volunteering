const { HttpError } = require('../../../config/errors')
const { UserService } = require('../../services')
const userService = new UserService

module.exports = (repository) => {
    async function execute(id){
        const team = await repository.getTeamById(id)
        return await userService.getLeads(team.leads)

    }
    return { execute }
}