require('dotenv').load()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
app.use(require('express-session')({
  secret: 'ilovethisstuff',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.Promise = require('bluebird')

mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
})

const User = require('./models/User')

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

/* eslint-disable no-console */
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(process.env.PORT, () => {
  routes(app)
  console.log('Server running on port', process.env.PORT)
})
