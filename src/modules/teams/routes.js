const express = require('express')
const TeamController = require('./controller')
const TeamDatabase = require('./data_access/database')
const TeamRepository = require('./repository')
const auth = require('../../middleware/auth')

const teamRoutes = () => {
    const database = new TeamDatabase()
    const repository = new TeamRepository(database)
    const router = express.Router()
    const controller = TeamController(repository)

    router.post('/team', controller.addTeam)
    
    return router
}

module.exports = teamRoutes