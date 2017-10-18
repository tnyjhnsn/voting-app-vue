const User = require('../models/User')
const passport = require('passport')
const jwt = require('jsonwebtoken')

function signUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {

  async register(req, res) {
    await User.create(req.body, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(400).send({
          error: 'That email address is already being used'
        })
      }
      res.send({
        user: user,
        token: signUser(user.toJSON())
      })
    })
  },

  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({email: email})
    if (!user) {
      return res.status(400).send({
        error: 'That email address is incorrect'
      })
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return res.status(400).send({
          error: 'General error checking password'
        })
      }
      if (!isMatch) {
        return res.status(400).send({
          error: 'That password is incorrect'
        })
      }
      res.send({
        user: user,
        token: signUser(user.toJSON())
      })
    })
  }

}