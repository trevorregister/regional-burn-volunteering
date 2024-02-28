const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(){
        const teams = await repository.getTeams()
        return teams

    }
    return { execute }
}