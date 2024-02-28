const express = require('express')
const UserController = require('./controller')
const UserDatabase = require('./data_access/database')
const UserRepository = require('./repository')
const auth = require('../../middleware/auth')

const userRoutes = () => {
    const database = new UserDatabase()
    const repository = new UserRepository(database)
    const router = express.Router()
    const controller = UserController(repository)

    router.get('/', controller.getUsers)
    router.get('/:id', controller.getUserById)
    router.get('/:id/shifts', controller.getShifts)
    router.get('/:id/teams', controller.getTeams)
    router.post('/', controller.addUser)
    router.post('/login', controller.loginUser)
    router.post('/logout', controller.logoutUser)
    
    return router
}

module.exports = userRoutes