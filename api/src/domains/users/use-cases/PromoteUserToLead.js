const client = require('../../client')

module.exports = (repository) => {
    async function execute(id, teamId){
        return Promise.all([
            await repository.promoteUserToLead(id),
            await repository.addTeam(id, teamId),
            await client.teams.addLead(teamId, id)
        ])
    }
    return { execute }
}

