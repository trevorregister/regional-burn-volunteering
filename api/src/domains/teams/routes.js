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

    router.post('/', controller.addTeam)
    router.post('/:id/generate-lead-keys', controller.generateLeadKeys)
    router.post('/delete-lead-key', controller.deleteLeadershipKey)
    router.get('/', controller.getTeams)
    router.get('/:id', controller.getTeamById)
    router.get('/:id/shifts', controller.getShifts)
    router.patch('/:id', controller.updateTeam)
    router.patch('/:id/addlead', controller.addLead)
    router.patch('/:id/removelead', controller.removeLead)
    
    return router
}

module.exports = teamRoutes