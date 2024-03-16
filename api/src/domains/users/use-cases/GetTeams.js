const TeamDTO = require('../../teams/dto')

module.exports = (repository) => {
    async function execute(id){
        return await repository.getTeams(id)
    }
    return { execute }
}

