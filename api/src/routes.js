const express = require('express')
const userRoutes = require('./modules/users/routes')
const teamRoutes = require('./modules/teams/routes')
const shiftRoutes = require('./modules/shifts/routes')
const eventRoutes = require('./modules/events/routes')

const Routes =(dependencies) => {
    const router = express.Router()
    router.use('/users', userRoutes())
    router.use('/teams', teamRoutes())
    router.use('/shifts', shiftRoutes())
    router.use('/events', eventRoutes())
    return router
}

module.exports = Routes