import axios from 'redaxios'
import { WebUser } from './types'
axios.defaults.withCredentials = true

export default class Users {
    readonly API_HOST: string
    constructor(API_HOST: string){
        this.API_HOST = API_HOST
    }
    getUserById(id: string){
        return axios.get(`${this.API_HOST}/users/${id}`)
    }

    getUsers(){
        return axios.get(`${this.API_HOST}/users`)
    }

    login({email, password}: {email: string, password: string}){
        const credentials = {
            email: email,
            password: password
        }
        return axios.post(`${this.API_HOST}/users/login`, credentials)
    }

    addUser({
        email, 
        name, 
        password, 
        leadershipKeyValue} :{
        email: string,
        name: string,
        password: string,
        leadershipKeyValue: string
        }){
        const user = {
            email: email,
            name: name,
            password: password,
            leadershipKeyValue: leadershipKeyValue
        }
        return axios.post(`${this.API_HOST}/users`,user)
    }

    getShifts(id: string){
        return axios.get(`${this.API_HOST}/users/${id}/shifts`)
    }

    getTeams(id: string){
        return axios.get(`${this.API_HOST}/users/${id}/teams`)
    }

    logout(){
        return axios.post(`${this.API_HOST}/users/logout`)
    }

    promoteUserToLead({id, teamId}: {id: string, teamId: string}){
        return axios.patch(`${this.API_HOST}/users/${id}/promote-user-to-lead`, {teamId: teamId})
    }
}