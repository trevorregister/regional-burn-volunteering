const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { UserShiftRelation } = require('../subjects')
const client = require('../../client')


module.exports = () => {
    async function execute(req){
        const { user } = req //user making request
        const { userId } = req.body
        const { id } = req.params //id = shiftId

        const shift = await client.shifts.getShiftById(id)
        const team = await client.teams.getTeamById(shift.team)

        const isRequestingUser = user.id === userId
        const isLeadingTeam = await client.teams.isLeadingTeam(team._id, user.id)
        
        const relation = new UserShiftRelation(isLeadingTeam, isRequestingUser)
        const ability = defineAbilityFor(user)
        if (!ability.can('update', relation)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}