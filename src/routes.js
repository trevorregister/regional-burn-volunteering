const express = require('express')
const userRoutes = require('./modules/users/routes')

const Routes =(dependencies) => {
    const router = express.Router()
    router.use('/users', userRoutes(dependencies))
    return router
}

module.exports = Routes