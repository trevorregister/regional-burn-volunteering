const Shift = require('../model')
const { HttpError } = require('../../../config/errors')
const { UserService, TeamService } = require('../../services')
const { ObjectId }= require('mongodb')

const userService = new UserService()
const teamService = new TeamService()


module.exports = (repository) => {
    async function execute(userId, shiftId,){
        const shift = await repository.getShiftById(shiftId)
        const user = await userService.getUserById(userId)
        const isShiftConflict = await repository.isShiftConflict(userId, shift.start, shift.end)
        if(!user) {
            throw new HttpError(404, 'user not found')
        }
        if(!shift) {
            throw new HttpError(404, 'shift not found')
        }
        if(isShiftConflict){
            throw new HttpError(400, 'shift conflict')
        }
        if(shift.signups + 1 > shift.capacity) { 
            throw new HttpError(400, `signups at capacity, ${shift.signups}/${shift.capacity}`)
        }
        if(user.shifts.includes(new ObjectId(shiftId))){
            throw new HttpError(400, `shift ${shiftId} in user's shifts`)
        }
        if(shift.members.includes(new ObjectId(userId))){
            throw new HttpError(400, `user ${userId} in shift members`)
        }

        return await Promise.all([
            await repository.incrementShift(shiftId),
            await repository.addMember(shiftId, userId),
            await userService.addTeam(userId, shift.team),
            await userService.addShift(userId, shiftId),
            await teamService.addMember(shift.team, userId)
        ])

    }

    return { execute }
}