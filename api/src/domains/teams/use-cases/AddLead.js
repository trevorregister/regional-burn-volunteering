const { HttpError } = require('../../../config/errors')
const client = require('../../client')
module.exports = (repository) => {
    async function execute(id, userId){
        const user = await client.users.getUserById(userId)
        if(!user) {
            throw new HttpError(404, `user ${id} not found`)
        }

        return Promise.all([
            await repository.addLead(id, userId),
            await client.users.addTeam(userId, id),
            await client.users.updateRole(userId, 'lead')
        ])
    }

    return { execute }
}