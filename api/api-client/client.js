const  Users   = require('./users')

module.exports = class Client {
    constructor(){
        this.users = new Users()
    }
}