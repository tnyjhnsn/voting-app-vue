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
    PollsController.getAll
  )
  app.get(
    '/polls/:userId',
    PollsController.getMine
  )
  app.post(
    '/poll',
    PollsController.createPoll
  )
  app.get(
    '/poll/:pollId',
    PollsController.getPoll
  )
  app.delete(
    '/poll/:pollId',
    PollsController.deletePoll
  )
  app.put(
    '/poll/:answerId',
    PollsController.incrementVote
  )
  app.put(
    '/poll',
    PollsController.updatePoll
  )
}
