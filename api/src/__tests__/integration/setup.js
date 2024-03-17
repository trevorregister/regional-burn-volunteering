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
        post: (endpoint, data, token = '') => request.post(`${domainRoute}${endpoint}`).set({'Cookie': `authcookie=${token}`}).send(data),
        get: (endpoint, token = '') => request.get(`${domainRoute}${endpoint}`).set({'Cookie': `authcookie=${token}`}),
        patch: (endpoint, data, token = '') => request.put(`${domainRoute}${endpoint}`).set({'Cookie': `authcookie=${token}`}).send(data),
        delete: (endpoint, token = '') => request.delete(`${domainRoute}${endpoint}`).set({'Cookie': `authcookie=${token}`})
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