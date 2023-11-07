const express = require('express')
const UserController = require('./controller')
const UserDatabase = require('./data_access/database')
const UserRepository = require('./repository')

const userRoutes = () => {
    const database = new UserDatabase()
    const repository = new UserRepository(database)
    const router = express.Router()
    const controller = UserController(repository)

    router.get('/users',controller.getUsers)
    router.get('/user/:id', controller.getUserById)
    router.get('/user', controller.getUserByEmail)
    router.post('/user', controller.addUser)
    
    return router
}

module.exports = userRoutes