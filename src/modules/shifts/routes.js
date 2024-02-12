const express = require('express')
const ShiftController = require('./controller')
const ShiftDatabase = require('./data_access/database')
const ShiftRepository = require('./repository')
const auth = require('../../middleware/auth')

const shiftRoutes = () => {
    const database = new ShiftDatabase()
    const repository = new ShiftRepository(database)
    const router = express.Router()
    const controller = ShiftController(repository)

    router.post('/', controller.addShift)
    router.get('/:id', controller.getShiftById)
    router.patch('/:id', controller.updateShift)
    router.patch('/:id/signup', controller.signup)
    
    return router
}

module.exports = shiftRoutes
