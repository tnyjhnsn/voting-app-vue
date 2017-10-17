const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

UserSchema.pre('save', function (next) {
  const SALT_FACTOR = 8
  bcrypt.hash(this.password, SALT_FACTOR, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareAsync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
