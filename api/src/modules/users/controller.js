const {
    GetUserById,
    GetUsers,
    AddUser,
    LoginUser,
    GetShifts
} = require('./use-cases/_index')

const UserDTO = require('./dto')

module.exports = (repository) => {
    const getUsers = async (req, res, next) => {
        try {
            const usersData = []
            const getUsersCase = GetUsers(repository)
            const users = await getUsersCase.execute()
            users.map(user => usersData.push(UserDTO.toWeb(user)))
            res.status(200).send(usersData)
        } catch (err) {
            next(err)
        }
    }

    const getUserById = async (req, res, next) => {
        try {
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
                ? res.status(201).cookie('authcookie', verified.token, {httpOnly: true, sameSite: 'strict'}).send(UserDTO.toWeb(verified.user))
                : res.status(401).send(verified)
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
            res.status(201).send(shifts)
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
        getShifts
    }
}

