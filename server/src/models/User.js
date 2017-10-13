const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

// TODO: hashing pre save is working, but i cannot get the
// bcrypt.compare to work.... grrrrr....
//
// UserSchema.pre('save', function (next) {
//   const SALT_FACTOR = 8
//   bcrypt.hash(this.password, SALT_FACTOR, (err, hash) => {
//     if (err) return next(err)
//     this.password = hash
//     next()
//   })
// })

UserSchema.methods.comparePassword = function (password) {
  return password === this.password
}

module.exports = mongoose.model('User', UserSchema)
