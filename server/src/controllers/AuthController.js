const User = require('../models/User')
const jwt = require('jsonwebtoken')

function signUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {

  async register(req, res) {
    const user = await User.create(req.body, (err, user) => {
      if (err) {
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
    if (!user.comparePassword(password)) {
      return res.status(400).send({
        error: 'That password is incorrect'
      })
    }
    res.send({
      user: user,
      token: signUser(user.toJSON())
    })
  }

}