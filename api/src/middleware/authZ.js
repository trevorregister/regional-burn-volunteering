const { defineAbilityFor } = require('../domains/auth/abilityBuilder')
const { HttpError } = require('../config/errors')

module.exports = function (req, res, next) {
    try {
       const ability = defineAbilityFor(req.user)
       if (!ability.can('read', 'User')) {
            throw new HttpError(403, 'unauthorized')
       }
       else {
        next()
       }

    }
    catch (err){
        next(err)
    }
}