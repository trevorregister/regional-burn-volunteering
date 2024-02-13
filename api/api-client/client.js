const  Users  = require('./users')

/* module.exports = class Client {
    constructor(){
        this.users = new Users()
    }
} */

class Client {
    constructor(){
        this.users = new Users()
    }
}

const client = new Client()

module.exports = {
    client
}