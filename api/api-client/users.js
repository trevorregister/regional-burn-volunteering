const axios = require('axios')
const {
    AddUser,
    GetShifts,
    GetUserById,
    GetUsers,
    LoginUser
} = require('../src/modules/users/use-cases/_index')
const HOST = 'http://localhost:3000/api/users'

module.exports = class Users {
    getUserById(id){
        return axios.get(`${HOST}/${id}`)
    }

    getUsers(){
        return axios.get(`${HOST}/`)
    }

    loginUser(email, password){
        return axios.post(`${HOST}/login`, {email: email, password: password})
    }
}