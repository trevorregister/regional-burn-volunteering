const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_DEV_URI, ()=>console.log('Connected to database...'))

app.use(helmet)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))


app.listen(process.env.PORT, ()=>console.log(`Listening on port ${env.PORT}...`))
