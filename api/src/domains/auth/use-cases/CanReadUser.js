const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')
const { User } = require('../subjects')

module.exports = () => {
    async function execute(req){
        const { user } = req
        const { id } = req.params
        const ability = defineAbilityFor(user)
        const userToBeRead = new User(id)
        if (!ability.can('read', userToBeRead)) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}