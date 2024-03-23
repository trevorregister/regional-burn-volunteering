import axios from 'redaxios'
axios.defaults.withCredentials = true

import {
    GetUserRequest,
    GetUserResponse,
    CreateUserRequest
} from '../api-types/_index'

export default class Users {
    readonly API_HOST: string
    constructor(API_HOST: string){
        this.API_HOST = API_HOST
    }
    async getUserById(id: GetUserRequest): Promise<GetUserResponse>{
        const res = await axios.get(`${this.API_HOST}/users/${id}`)
        return res.data
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

    async addUser({email, name, password, leadershipKeyValue} :CreateUserRequest): Promise<GetUserResponse>{
        const user: CreateUserRequest = {
            email: email,
            name: name,
            password: password,
            leadershipKeyValue: leadershipKeyValue
        }
        const res = await axios.post(`${this.API_HOST}/users`,user)
        return res.data
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