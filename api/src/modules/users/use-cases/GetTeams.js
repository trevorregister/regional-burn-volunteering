const TeamDTO = require('../../teams/dto')

module.exports = (repository) => {
    async function execute(id){
        const teamsResponse = await repository.getTeams(id)
        const teams = teamsResponse[0].teams
        const teamData = []
        teams.map(team => teamData.push(TeamDTO.toWeb(team) ))
        return teamData
    }
    return { execute }
}

