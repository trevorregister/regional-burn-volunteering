const User = require('../model')
const { HttpError } = require('../../../config/errors')
const bcrypt = require('bcrypt')
const { TeamService } = require('../../services')
const teamService = new TeamService()

module.exports = (repository) => {
    async function execute({name, email, role, password, leadershipKeyValue = null}){
        const userExists = await repository.getUserByEmail(email)
        if(userExists) {
            throw new HttpError(400,`${userExists.email}`, 'exists')
        }
        const hash = await bcrypt.hash(password, 10)
        const newUserData = new User(name, email, role, hash) 
        const newUser = await repository.create(newUserData)

        if(leadershipKeyValue){
            const leadershipKeyCheck = teamService.redeemLeadershipKey(leadershipKeyValue, newUser._id.toHexString())

            if(leadershipKeyCheck){
                newUser.role = 'lead'
                await teamService.addLead(leadershipKeyCheck._id.toHexString(), newUser._id.toHexString())
                await newUser.save()
            }
            else{
                throw new HttpError(400, 'leadership key value error')
            }
        }
    }
    return { execute }
}