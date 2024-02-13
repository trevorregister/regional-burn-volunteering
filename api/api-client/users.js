const axios = require('axios')
const HOST = 'http://localhost:3000/api/users'

module.exports = class Users {
    getUserById(id){
        return axios.get(`${HOST}/${id}`)
    }

    getUsers(){
        return axios.get(`${HOST}/`)
    }

    login({email, password}){
        const credentials = {
            email: email,
            password: password
        }
        return axios.post(`${HOST}/login`, credentials)
    }

    addUser({email, name, role, password}){
        const user = {
            email: email,
            name: name,
            role: role,
            password: password
        }
        return axios.post(`${HOST}/`,user)
    }

    getShifts(id){
        return axios.get(`${HOST}/${id}/shifts`)
    }

    logout(){
        return axios.post(`${HOST}/logout`)
    }
}