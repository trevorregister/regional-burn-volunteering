const Shift = require('../model')
const { HttpError } = require('../../../config/errors')
const { TeamService } = require('../../services')


const teamService = new TeamService()


module.exports = (repository) => {
    async function execute(name, description, teamId, start, end, capacity){
        const team = await teamService.getTeamById(teamId)
        if (!team) {throw new HttpError(404, `team ${teamId} not found`)}
        const shift = new Shift(name, description, teamId, start, end, capacity)
        return await repository.create(shift)

    }

    return { execute }
}