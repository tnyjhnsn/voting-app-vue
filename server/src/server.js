require('dotenv').load()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
})

/* eslint-disable no-console */
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(process.env.PORT, () => {
  routes(app)
  console.log('Server running on port', process.env.PORT)
})
