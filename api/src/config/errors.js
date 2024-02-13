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

class ValidationError extends HttpError {
    constructor(code, joiError){
        super(code)
        this.message = joiError.details.map(detail => detail.message)
    }
}

module.exports = {
    BaseError,
    HttpError,
    ValidationError
}