const { HttpError } = require('../../../config/errors')
const { UserService } = require('../../services')

const userService = new UserService()

module.exports = (repository) => {
    async function execute(id){
        const shift = await repository.getShiftById(id)

        if (!shift){ 
            throw new HttpError(404, `${id} shift not found`)
        } 

        for await (const member of shift.members){
            const user = await userService.getUserById(member)
            if (!user) continue
            const shiftsOnThisTeam = await userService.getShiftsByTeam(user._id, shift.team)
            await userService.removeShift(user._id, shift._id)
            if (shiftsOnThisTeam.length === 1){
                await userService.removeTeam(user._id, shift.team)
            }
        }

        return await repository.deleteShift(id)
    }
    return { execute }
}