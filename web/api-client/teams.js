import axios from 'axios'

export default class Teams {
    constructor(API_HOST){
        this.API_HOST = API_HOST
    }
    getTeamById(id){
        return axios.get(`${this.API_HOST}/teams/${id}`)
    }

    getTeams(){
        return axios.get(`${this.API_HOST}/teams`)
    }

    getShifts(id){
        return axios.get(`${this.API_HOST}/teams/${id}/shifts`)
    }

    getLeads(id){
        return axios.get(`${this.API_HOST}/teams/${id}/leads`)
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

    generateLeadershipKeys({id, quantity}){
        return axios.post(`${this.API_HOST}/teams/${id}/generate-leadership-keys`, {quantity: quantity})
    }

    deleteLeadershipKeys(leadershipKeyValue){
        return axios.post(`${this.API_HOST}/teams/delete-leadership-key`, {leadershipKeyValue: leadershipKeyValue})
    }
    
}