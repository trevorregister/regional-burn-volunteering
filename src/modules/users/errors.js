const { BaseError, HttpError } = require('../../config/errors')

class UserError extends HttpError{
    constructor(code, identity, message){
        super(message, code)

        this.identity = identity
        this.code = code
        this.message = identity.concat(' ', message)
    }
}

module.exports = {
    UserError
}