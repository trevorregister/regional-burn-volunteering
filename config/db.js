const mongoose = require('mongoose')
const dotenv = require('dgram').config()

async function connect(environment){
    switch (environment){
        case 'dev':
            var uri = process.env.MONGO_DEV_URI
            break
        case 'production':
            var uri = process.env.MONGO_PRODUCTION_URI
            break
    }

    var connection = await mongoose.connect(uri)
    console.log(`Connected to ${connection.connections[0].name}`)
} 

module.exports = {connect}