const axios = require('axios')
const HOST = 'http://localhost:3000/api/shifts'

module.exports = class Shifts {
    getShiftById(id){
        return axios.get(`${HOST}/${id}`)
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
        return axios.post(`${HOST}/`, shift) 
    }

    signup({id, userId}){
        return axios.patch(`${HOST}/${id}/signup`, {userId: userId})
    }

    unsignup({id, userId}){
        return axios.patch(`${HOST}/${id}/unsignup`, {userId: userId})
    }
}