import axios from 'axios'

export default class Users {
    constructor(API_HOST){
        this.API_HOST = API_HOST
    }
    getUserById(id){
        return axios.get(`${this.API_HOST}/users/${id}`)
    }

    getUsers(){
        return axios.get(`${this.API_HOST}/users`)
    }

    login({email, password}){
        const credentials = {
            email: email,
            password: password
        }
        return axios.post(`${this.API_HOST}/users/login`, credentials)
    }

    addUser({email, name, role, password}){
        const user = {
            email: email,
            name: name,
            role: role,
            password: password
        }
        return axios.post(`${this.API_HOST}/users`,user)
    }

    getShifts(id){
        return axios.get(`${this.API_HOST}/users/${id}/shifts`)
    }

    getTeams(id){
        return axios.get(`${this.API_HOST}/users/${id}/teams`)
    }

    logout(){
        return axios.post(`${this.API_HOST}/users/logout`)
    }

    promoteUserToLead({id, teamId}){
        return axios.patch(`${this.API_HOST}/users/${id}/promote-user-to-lead`, {teamId: teamId})
    }
}