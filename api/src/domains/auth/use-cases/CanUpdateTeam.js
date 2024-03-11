const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { Team } = require('../subjects')
const { 
    TeamService, 
} = require('../../services')

const teamService = new TeamService()

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request
        const { id } = req.params  
        const team = await teamService.getTeamById(id)
        const isLeadingTeam = await teamService.isLeadingTeam(team._id, user.id)
        const teamToUpdate = new Team(isLeadingTeam)

        const ability = defineAbilityFor(user)
        if (!ability.can('update', teamToUpdate)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}