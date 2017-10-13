const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{6,32}$')
      )
    }
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        switch (err.details[0].context.key) {
          case 'email':
            res.status(400).send({
              error: 'Please use a valid email address'
            })
            break
          case 'password':
            res.status(400).send({
              error: `Please make sure the password:
              <br />1. Is between 6 and 32 characters
              <br />2. Contains only lowercase and uppercase alphanumeric characters`
            })
            break
          default:
            res.status(400).send({
              error: 'Invalid registration details'
            })            
        }
      } else {
        next()
      }
    })
  }
}
