//const GetUsers = require('./use-cases/GetUsers')
const GetTeamById = require('./use-cases/GetTeamById')
const AddTeam = require('./use-cases/AddTeam')
const UpdateTeamCase = require('./use-cases/UpdateTeam')

module.exports = (repository) => {
    const getTeamById = async (req, res, next) => {
        try {
            const getTeamByIdCase = GetTeamById(repository)
            const { id } =  req.params
            const team  = await getTeamByIdCase.execute(id)
            res.status(200).send(team)
            
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

    const updateTeam = async (req, res, next) => {
        try {
            const updateTeamCase = UpdateTeamCase(repository)
            const update = req.body
            const { id } = req.params
            await updateTeamCase.execute(id, update)
            res.status(204).send('success')
        } catch (err) {
            next(err)
        }
    }

    return {
        getTeamById,
        addTeam,
        updateTeam
    }
}

