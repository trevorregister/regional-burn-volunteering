const { HttpError } = require('../../../config/errors')
const client = require('../../client')

module.exports = (repository) => {
    async function execute(id){
        const shift = await repository.getShiftById(id)
        const team = await client.teams.getTeamById(shift.team)

        if (!shift){ 
            throw new HttpError(404, `${id} shift not found`)
        } 

        if(!team){
            throw new HttpError(404, `${shift.team} team not found`)
        }

        await client.teams.removeShift(shift.team, id)

        for await (const member of shift.members){
            const user = await client.users.getUserById(member)
            if (!user) continue
            const shiftsOnThisTeam = await client.users.getShiftsByTeam(user._id, team._id)
            const isUserLeadingTeam = team.leads.includes(user._id)
            await client.users.removeShift(user._id, shift._id)
            if (shiftsOnThisTeam.length === 1 && !isUserLeadingTeam){
                await client.users.removeTeam(user._id, shift.team)
            }
        }

        return await repository.deleteShift(id)
    }
    return { execute }
}