const axios = require('axios')

module.exports = class Events {
    constructor(API_HOST){
        this.API_HOST = API_HOST
    }
    getEventById(id){
        return axios.get(`${this.API_HOST}/events/${id}`)
    }

    addEvent({name, description, start, end, capacity}){
        const event = {
            name: name,
            description: description,
            start: start,
            end: end,
            capacity: capacity
        }
        return axios.post(`${this.API_HOST}/events`, event) 
    }
}