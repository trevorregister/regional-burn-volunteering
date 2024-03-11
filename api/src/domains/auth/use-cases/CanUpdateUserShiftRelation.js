const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { UserShiftRelation } = require('../subjects')
const { 
    TeamService,
    ShiftService 
} = require('../../services')

const shiftService = new ShiftService()
const teamService = new TeamService()

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request
        const { userId } = req.body
        const { id } = req.params //id = shiftId

        const shift = await shiftService.getShiftById(id)
        const team = await teamService.getTeamById(shift.team)

        const isRequestingUser = user.id === userId
        const isLeadingTeam = await teamService.isLeadingTeam(team._id, user.id)
        
        const relation = new UserShiftRelation(isLeadingTeam, isRequestingUser)
        const ability = defineAbilityFor(user)
        if (!ability.can('update', relation)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}