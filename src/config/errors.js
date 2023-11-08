class BaseError extends Error {
    constructor (message) {
    super()
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = message
    Error.captureStackTrace(this)

    }
}

class HttpError extends BaseError{
    constructor(code, message){
        super(message)
        this.code = code
    }
}

module.exports = {
    BaseError,
    HttpError
}