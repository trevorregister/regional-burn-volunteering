const express = require('express')
const EventController = require('./controller')
const EventDatabase = require('./data_access/database')
const EventRepository = require('./repository')
const auth = require('../../middleware/auth')

const eventRoutes = () => {
    const database = new EventDatabase()
    const repository = new EventRepository(database)
    const router = express.Router()
    const controller = EventController(repository)

    router.post('/', controller.addEvent)
    router.get('/:id', controller.getEventById)
    router.patch('/:id', controller.updateEvent)
    
    return router
}

module.exports = eventRoutes
