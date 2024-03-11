const {
    GetUserById,
    GetUsers,
    AddUser,
    LoginUser,
    GetShifts,
    GetTeams,
    PromoteUserToLead,
} = require('./use-cases/_index')
const {
    CanReadUser,
    CanModifyTeamLeadership,
    IsEventLead 
} = require('../auth/use-cases/_index')

const UserDTO = require('./dto')

module.exports = (repository) => {
    const getUsers = async (req, res, next) => {
        try {
            const isEventLeadCase = IsEventLead()
            await isEventLeadCase.execute(req)
            
            const getUsersCase = GetUsers(repository)
            let users = await getUsersCase.execute()
            users = users.map(user => UserDTO.toWeb(user))

            res.status(200).send(usersData)
        } catch (err) {
            next(err)
        }
    }

    const getUserById = async (req, res, next) => {
        try {
            const canReadUserCase = CanReadUser()
            await canReadUserCase.execute(req)

            const getUserByIdCase = GetUserById(repository)
            const { id } = req.params
            const user = await getUserByIdCase.execute(id)

            res.status(200).send(UserDTO.toWeb(user))
        } catch (err) {
            next(err)
        }
    }

    const addUser = async (req, res, next) =>{
        try {
            const addUserCase = AddUser(repository)
            const newUser = await addUserCase.execute(UserDTO.toDb(req.body))
            
            res.status(201).send(UserDTO.toWeb(newUser))
        } catch (err) {
            next(err)
        }
    }

    const loginUser = async (req, res, next) => {
        try {
            const loginUserCase = LoginUser(repository)
            const { email, password } = req.body
            const verified = await loginUserCase.execute(email, password)
            verified
                ? res.status(201)
                     .cookie('authcookie', verified.token, {httpOnly: true, sameSite: 'strict'})
                     .send({user: UserDTO.toWeb(verified.user), token: verified.token})
                : res.status(401).send(UserDTO.toWeb(verified))
        } catch (err) {
            next(err)
        }
    }

    const logoutUser = (req, res, next) => {
        try {
            res.clearCookie('authcookie').status(200).send('logged out')
        } catch (err) {
            next(err)
        }
    }

    const getShifts = async (req, res, next) => {
        try {
            const getShiftsCase = GetShifts(repository)
            const { id } = req.params
            const shifts = await getShiftsCase.execute(id)

            res.status(200).send(shifts)
        } catch (err) {
            next(err)
        }
    }

    const getTeams = async (req, res, next) => {
        try {
            const getTeamsCase = GetTeams(repository)
            const { id } = req.params
            const teams = await getTeamsCase.execute(id)

            res.status(200).send(teams)
        } catch (err) {
            next(err)
        }
    }

    const promoteUserToLead = async (req, res, next) => {
        try {
            const canModifyTeamLeadershipCase = CanModifyTeamLeadership()
            await canModifyTeamLeadershipCase.execute(req)

            const promoteUserToLeadCase = PromoteUserToLead(repository)
            const { id } = req.params
            const { teamId }   = req.body
            await promoteUserToLeadCase.execute(id, teamId)
            
            res.status(204).send('user promoted to team lead')
        } catch (err) {
            next(err)
        }
    }

    return {
        getUsers,
        getUserById,
        addUser,
        loginUser,
        logoutUser,
        getShifts,
        getTeams,
        promoteUserToLead,
    }
}

