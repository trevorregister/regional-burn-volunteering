const {
    GetTeamById,
    AddTeam,
    UpdateTeam,
    AddLead
} = require('./use-cases/_index')
const TeamDTO = require('./dto')

module.exports = (repository) => {
    const getTeamById = async (req, res, next) => {
        try {
            const getTeamByIdCase = GetTeamById(repository)
            const team  = await getTeamByIdCase.execute(req.params.id)
            res.status(200).send(TeamDTO.toWeb(team))
            
        } catch (err) {
            next(err)
        }
    }

    const addTeam = async (req, res, next) => {
        try {
            const addTeamCase = AddTeam(repository)
            const newTeam = await addTeamCase.execute(TeamDTO.toDb(req.body))
            res.status(201).send(TeamDTO.toWeb(newTeam))
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

    const addLead = async (req, res, next) => {
        try {
            const addLeadCase = AddLead(repository)
            const { id }  = req.params
            const { userId }   = req.body
            await addLeadCase.execute(id, userId)
            res.status(201).send('lead added')
        } catch (err) {
            next(err)
        }
    }

    return {
        getTeamById,
        addTeam,
        updateTeam,
        addLead
    }
}

