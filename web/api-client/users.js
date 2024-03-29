import axios from 'redaxios'
axios.defaults.withCredentials = true

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

    addUser({email, name, password, leadershipKeyValue}){
        const user = {
            email: email,
            name: name,
            password: password,
            leadershipKeyValue: leadershipKeyValue
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