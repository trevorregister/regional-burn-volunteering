const supertest = require('supertest')
const app = require('../../../app')

const request = supertest(app)

const routes = {
    users: '/api/users',
    shifts: '/api/shifts',
    teams: '/api/teams',
    events: '/api/events'
}

function requestsBuilder(request, domainRoute){
    return {
        post: (endpoint, data) => request.post(`${domainRoute}/${endpoint}`).send(data),
        get: (endpoint) => request.get(`${domainRoute}/${endpoint}`),
        put: (endpoint, data) => request.put(`${domainRoute}/${endpoint}`).send(data),
        delete: (endpoint) => request.delete(`${domainRoute}/${endpoint}`)
    }
}

class Client {
    constructor(request, routes){
        this.users = requestsBuilder(request, routes.users)
        this.teams = requestsBuilder(request, routes.teams)
        this.shifts = requestsBuilder(request, routes.shifts)
        this.events = requestsBuilder(request, routes.events)
    }
}

const client = new Client(request, routes)

module.exports = client