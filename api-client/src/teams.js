import axios from 'axios'

export default class Teams {
    constructor(API_HOST){
        this.API_HOST = API_HOST
    }
    getTeamById(id){
        return axios.get(`${this.API_HOST}/teams/${id}`)
    }

    addTeam({name, description}){
        const team = {
            name: name,
            description: description,
        }
        return axios.post(`${this.API_HOST}/teams`, team) 
    }

    addLead({id, userId}){
        return axios.patch(`${this.API_HOST}/teams/${id}/addlead`, {userId: userId})
    }

    removeLead({id, userId}){
        return axios.patch(`${this.API_HOST}/teams/${id}/removelead`, {userId: userId})

    }
}