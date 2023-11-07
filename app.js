const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const Routes = require('./src/routes')

const app = express()

mongoose.connect(process.env.MONGO_DEV_URI).then(console.log(`Connected to db...`))

app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/', Routes())

app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))
