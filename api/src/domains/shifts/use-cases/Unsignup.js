const Shift = require('../model')
const { HttpError } = require('../../../config/errors')
const { UserService, TeamService } = require('../../services')
const { ObjectId }= require('mongodb')

const userService = new UserService()
const teamService = new TeamService()

module.exports = (repository) => {
    async function execute(userId, shiftId,){
        const operations = []
        const shift = await repository.getShiftById(shiftId)
        const user = await userService.getUserById(userId)
        const shiftsOnThisTeam = await userService.getShiftsByTeam(userId, shift.team)

        if(!user) {
            throw new HttpError(404, 'user not found')
        }
        if(!shift) {
            throw new HttpError(404, 'shift not found')
        }
        if(!user.shifts.includes(new ObjectId(shiftId))){
            throw new HttpError(400, `shift ${shiftId} not in user's shifts`)
        }
        if(!shift.members.includes(new ObjectId(userId))){
            throw new HttpError(400, `user ${userId} not in shift members`)
        }

        await Promise.all([
            await userService.removeShift(userId, shiftId),
            await repository.removeMember(shiftId, userId),
            await repository.decrementShift(shiftId)
        ])

        if (shiftsOnThisTeam.length === 1){
            await teamService.removeMember(userId)
            await userService.removeTeam(userId, shift.team)
        }

    }

    return { execute }
}