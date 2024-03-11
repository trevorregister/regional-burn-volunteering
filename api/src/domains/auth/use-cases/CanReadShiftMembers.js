const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { 
    TeamService,
    ShiftService
} = require('../../services')
const { UserShiftRelation } = require('../subjects')

const teamService = new TeamService()
const shiftService = new ShiftService()

module.exports = () => {
    async function execute(req){
        const { user } = req
        const { id } = req.params //shift id
        const shift = await shiftService.getShiftById(id)
        const isLeadingTeam = await teamService.isLeadingTeam(shift.team, user.id)
        const ability = defineAbilityFor(user)
        const userShiftRelation = new UserShiftRelation(isLeadingTeam, false)
        if (!ability.can('read', userShiftRelation)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}