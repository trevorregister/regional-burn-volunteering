const axios = require('axios')

module.exports = class Shifts {
    constructor(API_HOST){
        this.API_HOST = API_HOST
    }
    getShiftById(id){
        return axios.get(`${this.API_HOST}/shifts/${id}`)
    }

    addShift({name, description, teamId, start, end, capacity}){
        const shift = {
            name: name,
            description: description,
            teamId: teamId,
            start: start,
            end: end,
            capacity: capacity
        }
        return axios.post(`${this.API_HOST}/shifts/`, shift) 
    }

    signup({id, userId}){
        return axios.patch(`${this.API_HOST}/shifts/${id}/signup`, {userId: userId})
    }

    unsignup({id, userId}){
        return axios.patch(`${this.API_HOST}/shifts/${id}/unsignup`, {userId: userId})
    }
}