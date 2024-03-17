const Shift = require('../model')
const { HttpError } = require('../../../config/errors')
const { ObjectId }= require('mongodb')
const client = require('../../client')

module.exports = (repository) => {
    async function execute(userId, shiftId,){
        const operations = []
        const shift = await repository.getShiftById(shiftId)
        const user = await client.users.getUserById(userId)
        const team = await client.teams.getTeamById(shift.team)
        const shiftsOnThisTeam = await client.users.getShiftsByTeam(userId, shift.team)

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
            await client.users.removeShift(userId, shiftId),
            await repository.removeMember(shiftId, userId),
            await repository.decrementShift(shiftId)
        ])

        if (shiftsOnThisTeam.length === 1 && !team.leads.includes(user._id)){
            await client.teams.removeMember(userId)
            await client.users.removeTeam(userId, shift.team)
        }

    }

    return { execute }
}