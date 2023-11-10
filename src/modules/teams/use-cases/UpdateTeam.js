const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id, update){
        const team = await repository.getTeamById(id)
        if( !team ) { throw new HttpError(404, `team ${id} not found`) }
        return await repository.updateTeam(id, update)

    }
    return { execute }
}

