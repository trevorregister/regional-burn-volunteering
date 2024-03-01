const {
    GetTeamById,
    AddTeam,
    UpdateTeam,
    AddLead,
    RemoveLead,
    GetTeams,
    GetShifts,
    GenerateLeadCodes
} = require('./use-cases/_index')
const TeamDTO = require('./dto')
const ShiftDTO = require('../shifts/dto')

module.exports = (repository) => {
    const getTeams = async (req, res, next) => {
        try {
            const getTeamsCase = GetTeams(repository)
            const teams = []
            const teamsResponse = await getTeamsCase.execute()
            for await (const teamResponse of teamsResponse) {
                teams.push(TeamDTO.toWeb(teamResponse))
            }
            res.status(200).send(teams)
        } catch (err) {
            next(err)
        }
    }
    const getTeamById = async (req, res, next) => {
        try {
            const getTeamByIdCase = GetTeamById(repository)
            const team  = await getTeamByIdCase.execute(req.params.id)
            res.status(200).send(TeamDTO.toWeb(team))
            
        } catch (err) {
            next(err)
        }
    }

    const getShifts = async (req, res, next) => {
        try {
            const getShiftsCase = GetShifts(repository)
            const shifts = []
            const shiftsResponse = await getShiftsCase.execute(req.params.id)
            for await (const shiftResponse of shiftsResponse) {
                shifts.push(ShiftDTO.toWeb(shiftResponse))
            }
            res.status(200).send(shifts)
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

    const removeLead = async (req, res, next) => {
        try {
            const removeLeadCase = RemoveLead(repository)
            const { id } = req.params
            const { userId } = req.body
            await removeLeadCase.execute(id, userId)
            res.status(201).send('lead removed')
        } catch (err) {
            next(err)
        }
    }

    const generateLeadCodes = async (req, res, next) => {
        try{
            const generateLeadCodesCase = GenerateLeadCodes(repository)
            const { id } = req.body
            const { quantity } = req.body
            const codes = await generateLeadCodesCase.execute(id, quantity)
            res.status(201).send(codes)
        }
        catch(err){
            next(err)
        }
    }

    return {
        getTeamById,
        addTeam,
        updateTeam,
        addLead,
        removeLead,
        getTeams,
        getShifts,
        generateLeadCodes
    }
}

