const GetUserByEmail = require('./use-cases/GetUserByEmail')
const GetUsers = require('./use-cases/GetUsers')

module.exports = (repository) => {
    const getUserByEmail = (req, res, next) =>{
        const getUserByEmailCase = GetUserByEmail(repository)
        const { email } = req.body
        getUserByEmailCase.execute(email)
            .then(
                result => {res.json(result)}
            )
    }

    const getUsers = (req, res, next) => {
        const getUsersCase = GetUsers(repository)
        getUsersCase.execute()
            .then(
                result => {res.json(result)}
            )
    }

    return {
        getUserByEmail,
        getUsers
    }
}

