const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const Routes = require('./src/routes')
const errorHandler = require('./src/middleware/errorHandler')
const cors = require('cors')

const app = express()
const corsOptions = {
    origin: process.env.WEB_HOST,
    credentials: true
}



app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/api', Routes())
app.use(errorHandler)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'web/index.html'));
})

module.exports = app 
