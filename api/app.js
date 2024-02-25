const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const Routes = require('./src/routes')
const errorHandler = require('./src/middleware/errorHandler')
const db = require('./config/db')
const cors = require('cors')

const app = express()
/* const corsOptions = {
    origin: 'https://localhost:5173/'
} */


db.connect('local')

app.use(helmet())
app.use(cookieParser())
app.use(express.json())
//app.use(cors(corsOptions))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/api', Routes())
app.use(errorHandler)
app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))