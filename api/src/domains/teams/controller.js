const {
    GetTeamById,
    AddTeam,
    UpdateTeam,
    AddLead,
    RemoveLead,
    GetTeams,
    GetShifts,
    GenerateLeadershipKeys,
    DeleteLeadershipKey,
    GetLeads
} = require('./use-cases/_index')

const {
    IsEventLead,
    CanUpdateTeam,
    CanModifyTeamLeadership
} = require('../auth/use-cases/_index')

const TeamDTO = require('./dto')
const ShiftDTO = require('../shifts/dto')
const UserDTO = require('../users/dto')

module.exports = (repository) => {
    const getTeams = async (req, res, next) => {
        try {
            const getTeamsCase = GetTeams(repository)
            const teamsResponse = await getTeamsCase.execute()
            const teams = teamsResponse.map(team => TeamDTO.toWeb(team))

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
            const { id } = req.params
            let shifts = await getShiftsCase.execute(id)
            shifts = shifts.map(shift => shift = ShiftDTO.toWeb(shift))

            res.status(200).send(shifts)
        } catch (err) {
            next(err)
        }
    }

    const getLeads = async (req, res, next) => {
        //this doesn't seem to be used anywhere in the front yet.
        try {
            const getLeadsCase = GetLeads(repository)
            const { id } = req.params
            let leads = await getLeadsCase.execute(id)
            leads = leads.map(lead => lead = UserDTO.toWeb(lead))
            
            res.status(200).send(leads)
            
        } catch (err) {
            next(err)
        }
    }


    const addTeam = async (req, res, next) => {
        try {
            const IsEventLeadCase = IsEventLead()
            await IsEventLeadCase.execute(req)

            const addTeamCase = AddTeam(repository)
            const newTeam = await addTeamCase.execute(TeamDTO.toDb(req.body))

            res.status(201).send(TeamDTO.toWeb(newTeam))
        } catch (err) {
            next(err)
        }
    }

    const updateTeam = async (req, res, next) => {
        try {
            const canUpdateTeamCase = CanUpdateTeam()
            await canUpdateTeamCase.execute(req)

            const updateTeamCase = UpdateTeam(repository)
            const update = req.body
            const { id } = req.params
            await updateTeamCase.execute(id, update)

            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    const addLead = async (req, res, next) => {
        try {
            const IsEventLeadCase = IsEventLead()
            await IsEventLeadCase.execute(req)

            const addLeadCase = AddLead(repository)
            const { id }  = req.params
            const { userId }   = req.body
            await addLeadCase.execute(id, userId)

            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    const removeLead = async (req, res, next) => {
        try {
            const IsEventLeadCase = IsEventLead()
            await IsEventLeadCase.execute(req)

            const removeLeadCase = RemoveLead(repository)
            const { id } = req.params
            const { userId } = req.body
            await removeLeadCase.execute(id, userId)

            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    const generateLeadershipKeys = async (req, res, next) => {
        try{
            const IsEventLeadCase = IsEventLead()
            await IsEventLeadCase.execute(req)

            const generateLeadershipKeysCase = GenerateLeadershipKeys(repository)
            const { id } = req.params
            const { quantity } = req.body
            const leadershipKeys = await generateLeadershipKeysCase.execute(id, quantity)

            res.status(201).send(leadershipKeys)
        }
        catch(err){
            next(err)
        }
    }

    const deleteLeadershipKey = async (req, res, next) => {
        try{
            const IsEventLeadCase = IsEventLead()
            await IsEventLeadCase.execute(req)

            const deleteLeadershipKeyCase = DeleteLeadershipKey(repository)
            const { leadershipKeyValue } = req.body
            await deleteLeadershipKeyCase.execute(leadershipKeyValue)
            
            res.status(204).end()
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
        generateLeadershipKeys,
        deleteLeadershipKey,
        getLeads
    }
}

