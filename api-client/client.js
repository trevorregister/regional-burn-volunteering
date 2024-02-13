const {
    Users,
    Shifts,
    Teams,
    Events
} = require('./_index')

class Client {
    constructor(API_HOST){
        this.API_HOST = API_HOST
        this.users = new Users(API_HOST)
        this.shifts = new Shifts(API_HOST)
        this.teams = new Teams(API_HOST)
        this.events = new Events(API_HOST)
    }
}

const client = new Client('http://localhost:3000/api')

module.exports = {
    client
}