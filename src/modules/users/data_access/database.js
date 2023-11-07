const mongoose = require('mongoose')
const schema = require('./schema')

module.exports = class UserDatabase {
    constructor(){
        return mongoose.model('Users', schema)
    }
}