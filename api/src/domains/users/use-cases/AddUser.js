const User = require('../model')
const { HttpError } = require('../../../config/errors')
const bcrypt = require('bcrypt')
const { TeamService } = require('../../services')
const teamService = new TeamService()

module.exports = (repository) => {
    //a little janky because the redeemLeadershipKey call sets the user that redeems it. which means the user has to exist in the data base first.
    async function execute({name, email, role, password, leadershipKeyValue = null}){
        const userExists = await repository.getUserByEmail(email)
        if(userExists) {
            throw new HttpError(400,`${userExists.email}`, 'exists')
        }
        const hash = await bcrypt.hash(password, 10)
        const newUserData = new User(name, email, role, hash) 
        const newUser = await repository.create(newUserData)
        if(leadershipKeyValue === ' ') {
            return newUser
        }
        else{
            const leadershipKeyCheck = await teamService.redeemLeadershipKey(leadershipKeyValue, newUser._id.toHexString())
            if(leadershipKeyCheck){
                newUser.role = 'lead'
                if(!newUser.teams.includes(leadershipKeyCheck._id)){
                    newUser.teams.push(leadershipKeyCheck._id)
                }
                await teamService.addLead(leadershipKeyCheck._id.toHexString(), newUser._id.toHexString())
                return await newUser.save()
            }
            else{
                await repository.deleteUser(newUser._id) //ensures user account doesn't stay created if leadershipKeyCheck fails. Refactor this to use transactions.
                throw new HttpError(400, 'leadership key value error')
            }
        }
    }
    return { execute }
}