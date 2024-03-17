const app = require('./app')
const db = require('./config/db')
const dotenv = require('dotenv').config()

db.connect('local')
app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))