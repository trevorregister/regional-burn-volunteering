const express = require('express')
const userRoutes = require('./modules/users/routes')
const teamRoutes = require('./modules/teams/routes')
const shiftRoutes = require('./modules/shifts/routes')
const eventRoutes = require('./modules/events/routes')

const Routes =(dependencies) => {
    const router = express.Router()
    router.use('/user', userRoutes())
    router.use('/team', teamRoutes())
    router.use('/shift', shiftRoutes())
    router.use('/event', eventRoutes())
    return router
}

module.exports = Routes