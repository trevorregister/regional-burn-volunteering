const app = require('./app')
const dotenv = require('dotenv').config()

app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))