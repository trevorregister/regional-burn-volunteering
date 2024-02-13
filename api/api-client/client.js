const Users  = require('./users')
const Shifts = require('./shifts')

class Client {
    constructor(){
        this.users = new Users()
        this.shifts = new Shifts()
    }
}

const client = new Client()

module.exports = {
    client
}