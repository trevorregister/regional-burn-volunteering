const TeamDTO = require('../../teams/dto')

module.exports = (repository) => {
    async function execute(id){
        const teams = await repository.getTeams(id)
        const teamsResponse = []
        teams.map(team => teamsResponse.push(TeamDTO.toWeb(team) ))
        return teamsResponse
    }
    return { execute }
}

