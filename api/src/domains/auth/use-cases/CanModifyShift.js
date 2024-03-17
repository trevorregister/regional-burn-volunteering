const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { Shift } = require('../subjects')
const client = require('../../client')

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request
        let { teamId } = req.body

        if(!teamId){
            const shift = await client.shifts.getShiftById(req.params.id)
            teamId = shift.team
        }

        const team = await client.teams.getTeamById(teamId)

        const isLeadingTeam = await client.teams.isLeadingTeam(team._id, user.id)
        
        const shiftToModify = new Shift(isLeadingTeam)
        const ability = defineAbilityFor(user)
        if (!ability.can('write', shiftToModify)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}