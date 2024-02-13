const {
    Users,
    Shifts,
    Teams
} = require('./_index')

class Client {
    constructor(){
        this.users = new Users()
        this.shifts = new Shifts()
        this.teams = new Teams()
    }
}

const client = new Client()

module.exports = {
    client
}