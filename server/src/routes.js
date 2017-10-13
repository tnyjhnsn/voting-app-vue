const AuthPolicy = require('./policies/AuthPolicy')
const AuthController = require('./controllers/AuthController')
const PollsController = require('./controllers/PollsController')

module.exports = (app) => {
  app.post(
    '/register',
    AuthPolicy.register,
    AuthController.register
  )
  app.post(
    '/login',
    AuthController.login
  )
  app.get(
    '/polls',
    PollsController.list
  )
  app.get(
    '/polls/:userId',
    PollsController.listMy
  )
  app.post(
    '/poll/create',
    PollsController.create
  )
  app.get(
    '/poll/:pollId',
    PollsController.poll
  )
  app.delete(
    '/poll/delete/:pollId',
    PollsController.delete
  )
  app.put(
    '/poll/vote/:answerId',
    PollsController.vote
  )
  app.post(
    '/poll/update',
    PollsController.update
  )
}
