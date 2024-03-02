const { TeamService } = require('../../services')
const teamService = new TeamService()

module.exports = (repository) => {
    async function execute(id, teamId){
        console.log('teamId', teamId, 'id', id)

        return Promise.all([
            await repository.promoteUserToLead(id),
            await teamService.addLead(teamId, id)
        ])
    }
    return { execute }
}

