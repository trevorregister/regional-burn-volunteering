const { HttpError } = require('../../../config/errors')
const { 
    UserService,
    TeamService 
} = require('../../services')

const userService = new UserService()
const teamService = new TeamService()

module.exports = (repository) => {
    async function execute(id){
        const shift = await repository.getShiftById(id)
        const team = await teamService.getTeamById(shift.team)

        if (!shift){ 
            throw new HttpError(404, `${id} shift not found`)
        } 

        if(!team){
            throw new HttpError(404, `${shift.team} team not found`)
        }

        await teamService.removeShift(shift.team, id)

        for await (const member of shift.members){
            const user = await userService.getUserById(member)
            if (!user) continue
            const shiftsOnThisTeam = await userService.getShiftsByTeam(user._id, team._id)
            const isUserLeadingTeam = team.leads.includes(user._id)
            await userService.removeShift(user._id, shift._id)
            if (shiftsOnThisTeam.length === 1 && !isUserLeadingTeam){
                await userService.removeTeam(user._id, shift.team)
            }
        }

        return await repository.deleteShift(id)
    }
    return { execute }
}