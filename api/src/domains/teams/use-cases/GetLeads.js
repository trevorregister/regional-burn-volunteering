const { HttpError } = require('../../../config/errors')
const client = require('../../client')

module.exports = (repository) => {
    async function execute(id){
        const team = await repository.getTeamById(id)
        return await client.users.getLeads(team.leads)

    }
    return { execute }
}