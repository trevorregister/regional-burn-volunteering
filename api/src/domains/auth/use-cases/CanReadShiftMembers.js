const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const client = require('../../client')
const { UserShiftRelation } = require('../subjects')

module.exports = () => {
    async function execute(req){
        const { user } = req
        const { id } = req.params //shift id
        const shift = await client.shifts.getShiftById(id)
        const isLeadingTeam = await client.teams.isLeadingTeam(shift.team, user.id)
        const ability = defineAbilityFor(user)
        const userShiftRelation = new UserShiftRelation(isLeadingTeam, false)
        if (!ability.can('read', userShiftRelation)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}