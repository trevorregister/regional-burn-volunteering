const mongoose = require('mongoose')
const schema = require('./schema')

module.exports = class EventDatabase {
    constructor(){
        return mongoose.model('events', schema)
    }
}