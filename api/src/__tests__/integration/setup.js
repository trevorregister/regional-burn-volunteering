const supertest = require('supertest')
const app = require('../../../app')

const supertestRequest = supertest(app)

const routes = {
    users: '/api/users',
    shifts: '/api/shifts',
    teams: '/api/teams',
    events: '/api/events'
}

function createRequestMethods(request, domainRoute){
    return {
        post: (endpoint, data, token = '') => 
            request
                .post(`${domainRoute}${endpoint}`)
                .set({'Cookie': `authcookie=${token}`})
                .send(data),
        get: (endpoint, token = '') => 
            request
                .get(`${domainRoute}${endpoint}`)
                .set({'Cookie': `authcookie=${token}`})
        ,
        patch: (endpoint, data, token = '') => 
            request
                .patch(`${domainRoute}${endpoint}`)
                .set({'Cookie': `authcookie=${token}`})
                .send(data)
        ,
        delete: (endpoint, token = '') => 
            request
                .delete(`${domainRoute}${endpoint}`)
                .set({'Cookie': `authcookie=${token}`})
        
    }
}

class Request {
    constructor(request, routes){
        this.users = createRequestMethods(request, routes.users)
        this.teams = createRequestMethods(request, routes.teams)
        this.shifts = createRequestMethods(request, routes.shifts)
        this.events = createRequestMethods(request, routes.events)
    }
}

const client = new Request(supertestRequest, routes)

module.exports = client