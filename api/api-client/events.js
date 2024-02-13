const axios = require('axios')
const HOST = 'http://localhost:3000/api/events'

module.exports = class Events {
    getEventById(id){
        return axios.get(`${HOST}/${id}`)
    }

    addEvent({name, description, start, end, capacity}){
        const event = {
            name: name,
            description: description,
            start: start,
            end: end,
            capacity: capacity
        }
        return axios.post(`${HOST}/`, event) 
    }
}