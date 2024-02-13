const jwt = require('jsonwebtoken')
const { HttpError } = require('../config/errors')

module.exports = function (req, res, next) {
    try {
        const token = req.cookies.authcookie
        if (!token) { throw new HttpError(401, 'not logged in') }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) { throw new HttpError(403, 'unauthorized') }
        next()

    }
    catch (err){
        next(err)
    }
}