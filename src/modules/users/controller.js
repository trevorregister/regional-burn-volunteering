const GetUserByEmail = require('./use-cases/GetUserByEmail')
const GetUserById = require('./use-cases/GetUserById')
const GetUsers = require('./use-cases/GetUsers')
const AddUser = require('./use-cases/AddUser')
const LoginUser = require('./use-cases/LoginUser')

module.exports = (repository) => {
    const getUserByEmail = async (req, res, next) =>{
        try {
            const getUserByEmailCase = GetUserByEmail(repository)
            const { email } = req.body
            const user = await getUserByEmailCase.execute(email)
            res.status(200).send(user)
        } catch (err) {
            next(err)
        }
    }

    const getUsers = async (req, res, next) => {
        try {
            const getUsersCase = GetUsers(repository)
            const users = await getUsersCase.execute()
            res.status(200).send(users)
        } catch (err) {
            next(err)
        }
    }

    const getUserById = async (req, res, next) => {
        try {
            const getUserByIdCase = GetUserById(repository)
            const { id } = req.params
            const user = await getUserByIdCase.execute(id)
            res.status(200).send(user)
        } catch (err) {
            next(err)
        }
    }

    const addUser = async (req, res, next) =>{
        try {
            const addUserCase = AddUser(repository)
            const { name, email, role, password } = req.body
            const newUser = await addUserCase.execute(name, email, role, password)
            res.status(201).send(newUser)
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
                ? res.status(201).cookie('authcookie', verified.token, {httpOnly: true, sameSite: 'strict'}).send(verified.user)
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

    return {
        getUserByEmail,
        getUsers,
        getUserById,
        addUser,
        loginUser,
        logoutUser
    }
}

