const Shift = require('../model')
const { HttpError } = require('../../../config/errors')
const { TeamService } = require('../../services')


const teamService = new TeamService()


module.exports = (repository) => {
    async function execute({name, description, teamId, start, end, capacity}){
        const team = await teamService.getTeamById(teamId)
        if (!team) {throw new HttpError(404, `team ${teamId} not found`)}
        start = new Date(start)
        end = new Date(end)
        const duration = (end - start)/3600000 //converts to hours
        const shift = new Shift(name, description, teamId, start, end, duration, capacity)
        return await repository.create(shift)

    }

    return { execute }
}