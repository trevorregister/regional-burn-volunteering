const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { Shift } = require('../subjects')
const { 
    TeamService, 
} = require('../../services')

const teamService = new TeamService()

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request
        const { teamId } = req.body

        const team = await teamService.getTeamById(teamId)

        const isLeadingTeam = await teamService.isLeadingTeam(team._id, user.id)
        
        const shiftToModify = new Shift(isLeadingTeam)
        const ability = defineAbilityFor(user)
        if (!ability.can('write', shiftToModify)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}