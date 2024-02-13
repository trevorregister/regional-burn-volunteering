const {
    Users,
    Shifts,
    Teams,
    Events
} = require('./_index')

class Client {
    constructor(){
        this.users = new Users()
        this.shifts = new Shifts()
        this.teams = new Teams()
        this.events = new Events()
    }
}

const client = new Client()

module.exports = {
    client
}