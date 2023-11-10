const mongoose = require('mongoose')
const schema = require('./schema')

module.exports = class ShiftDatabase {
    constructor(){
        return mongoose.model('shifts', schema)
    }
}