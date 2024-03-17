const { HttpError } = require('../../../config/errors')
const client = require('../../client')

module.exports = (repository) => {
    async function execute(id, userId){
        const user = await client.users.getUserById(userId)
        if(!user) {
            throw new HttpError(404, `user ${id} not found`)
        }
        await repository.removeLead(id, userId)
        const isLeadingAnyTeam = await repository.isLeadingAnyTeam(userId)
        if(!isLeadingAnyTeam){
            await client.users.updateRole(userId, 'user')
        }

    }

    return { execute }
}