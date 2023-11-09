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

    router.get('/users',controller.getUsers)
    router.get('/user/:id', auth, controller.getUserById)
    router.get('/user', controller.getUserByEmail)
    router.post('/user', controller.addUser)
    router.post('/user/login', controller.loginUser)
    router.post('/user/logout', controller.logoutUser)
    
    return router
}

module.exports = userRoutes