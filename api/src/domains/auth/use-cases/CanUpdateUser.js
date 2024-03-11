const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { User } = require('../subjects')

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request
        const { userId } = req.body
        const ability = defineAbilityFor(user)
        const userToBeUpdated = new User(userId)
        if (!ability.can('update', userToBeUpdated)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}