const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id){
        const team = await repository.getTeamById(id)
        if (!team) { throw new HttpError(404, `${id} team not found`) } 
        return team

    }
    return { execute }
}