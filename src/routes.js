const express = require('express')
const userRoutes = require('./modules/users/routes')
const teamRoutes = require('./modules/teams/routes')
const shiftRoutes = require('./modules/shifts/routes')

const Routes =(dependencies) => {
    const router = express.Router()
    router.use('/user', userRoutes())
    router.use('/team', teamRoutes())
    router.use('/shift', shiftRoutes())
    return router
}

module.exports = Routes