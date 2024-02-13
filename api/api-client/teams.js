const axios = require('axios')
const HOST = 'http://localhost:3000/api/teams'

module.exports = class Teams {
    getTeamById(id){
        return axios.get(`${HOST}/${id}`)
    }

    addTeam({name, description}){
        const team = {
            name: name,
            description: description,
        }
        return axios.post(`${HOST}/`, team) 
    }
}