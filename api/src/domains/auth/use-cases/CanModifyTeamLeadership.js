const { defineAbilityFor } = require('../abilityBuilder')
const { HttpError } = require('../../../config/errors')

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request        
        const ability = defineAbilityFor(user)
        if (!ability.can('write', 'Team')) {
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}