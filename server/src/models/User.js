const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

UserSchema.plugin(passportLocalMongoose)

UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 10
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
  })
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  })
}

module.exports = mongoose.model('User', UserSchema)
