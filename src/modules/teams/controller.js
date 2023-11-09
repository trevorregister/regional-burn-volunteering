//const GetUsers = require('./use-cases/GetUsers')
const GetTeams = require('./use-cases/GetTeams')
const AddTeam = require('./use-cases/AddTeam')

module.exports = (repository) => {
    const getTeams = async (req, res, next) => {
        try {
            const getTeamsCase = GetTeams(repository)
            const { teams } =  req.body
            res.status(200).send(teams)
            
        } catch (err) {
            next(err)
        }
    }

    const addTeam = async (req, res, next) => {
        try {
            const addTeamCase = AddTeam(repository)
            const { name, description } = req.body
            const newTeam = await addTeamCase.execute(name, description)
            res.status(201).send(newTeam)
        } catch (err) {
            next(err)
        }
    }

    return {
        getTeams,
        addTeam
    }
}

