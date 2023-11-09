const GetUserByEmail = require('./use-cases/GetUserByEmail')
const GetUserById = require('./use-cases/GetUserById')
const GetUsers = require('./use-cases/GetUsers')
const AddUser = require('./use-cases/AddUser')
const LoginUser = require('./use-cases/LoginUser')

module.exports = (repository) => {
    const getUserByEmail = async (req, res, next) =>{
        const getUserByEmailCase = GetUserByEmail(repository)
        const { email } = req.body
        const user = await getUserByEmailCase.execute(email)
        res.status(200).send(user)
    }

    const getUsers = async (req, res, next) => {
        const getUsersCase = GetUsers(repository)
        const users = await getUsersCase.execute()
        res.status(200).send(users)
    }

    const getUserById = async (req, res, next) => {
        const getUserByIdCase = GetUserById(repository)
        const { id } = req.params
        const user = await getUserByIdCase.execute(id)
        res.status(200).send(user)
    }

    const addUser = async (req, res, next) =>{
        const addUserCase = AddUser(repository)
        const { name, email, role, password } = req.body
        const newUser = await addUserCase.execute(name, email, role, password)
        res.status(201).send(newUser)
    }

    const loginUser = async (req, res, next) => {
        const loginUserCase = LoginUser(repository)
        const { email, password } = req.body
        const verified = await loginUserCase.execute(email, password)
        verified
            ? res.status(201).header('x-auth-token', verified.token).send(verified.user)
            : res.status(401).send(verified)
    }

    return {
        getUserByEmail,
        getUsers,
        getUserById,
        addUser,
        loginUser
    }
}

