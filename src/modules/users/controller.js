const GetUserByEmail = require('./use-cases/GetUserByEmail')
const GetUserById = require('./use-cases/GetUserById')
const GetUsers = require('./use-cases/GetUsers')

module.exports = (repository) => {
    const getUserByEmail = (req, res, next) =>{
        const getUserByEmailCase = GetUserByEmail(repository)
        const { email } = req.body
        getUserByEmailCase.execute(email)
            .then(
                result => {res.status(201).send(result)}
            )
    }

    const getUsers = (req, res, next) => {
        const getUsersCase = GetUsers(repository)
        getUsersCase.execute()
            .then(
                result => {res.json(result)}
            )
    }

    const getUserById = (req, res, next) => {
        const getUserByIdCase = GetUserById(repository)
        const { id } = req.params
        getUserByIdCase.execute(id)
            .then(
                result => {res.status(201).send(result)}
            )
    }

    return {
        getUserByEmail,
        getUsers,
        getUserById
    }
}

