const express = require('express')
const userRoutes = require('./domains/users/routes')
const teamRoutes = require('./domains/teams/routes')
const shiftRoutes = require('./domains/shifts/routes')
const eventRoutes = require('./domains/events/routes')

const Routes =(dependencies) => {
    const router = express.Router()
    router.use('/users', userRoutes())
    router.use('/teams', teamRoutes())
    router.use('/shifts', shiftRoutes())
    router.use('/events', eventRoutes())
    return router
}

module.exports = Routes