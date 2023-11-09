const express = require('express')
const userRoutes = require('./modules/users/routes')
const teamRoutes = require('./modules/teams/routes')

const Routes =(dependencies) => {
    const router = express.Router()
    router.use('/', userRoutes())
    router.use('/', teamRoutes())
    return router
}

module.exports = Routes