const { HttpError } = require('../../config/errors')

class TeamError extends HttpError{
    constructor(code, identify, message){
        super(message, code)

        this.identity = identity
        this.code = code
        this.message = identity.concat(' ', message)
    }
}

module.exports = {
    TeamError
}