const mongoose = require('mongoose')
const schema = require('./schema')

module.exports = class TeamDatabase {
    constructor(){
        return mongoose.model('teams', schema)
    }
}