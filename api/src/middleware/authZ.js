const { defineAbilityFor } = require('../domains/auth/abilityBuilder')
const { HttpError } = require('../config/errors')

class User {
    constructor(id){
        this.id = id
    }
}

module.exports = function (req, res, next) {
    try {
        const ability = defineAbilityFor(req.user)
        const userToBeRead = new User(req.params.id)
        if (!ability.can('read', userToBeRead)) {
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