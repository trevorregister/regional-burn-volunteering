const { TeamService } = require('../../services')
const teamService = new TeamService()

module.exports = (repository) => {
    async function execute(id, teamId){
        return Promise.all([
            await repository.promoteUserToLead(id),
            await repository.addTeam(id, teamId),
            await teamService.addLead(teamId, id)
        ])
    }
    return { execute }
}

