const Poll = require('../models/Poll')

module.exports = {

  async createPoll(req, res) {
    await Poll.create(req.body, (err, poll) => {
      if (err) {
        return res.status(400).send({
          error: 'Cannot create poll'
        })
      }
      res.send({
        poll: poll
      })
    })
  },

  async getAll(req, res) {
    await Poll.find({}, (err, polls) => {
      if (err) {
        return res.status(500).send({
          error: 'Cannot retrieve all polls'
        })
      }
      res.send({
        polls: polls
      })
    }) 
  },

  async getMine(req, res) {
    await Poll.find({ owner: req.params.userId }, (err, polls) => {
      if (err) {
        return res.status(500).send({
          error: 'Cannot retrieve user polls'
        })
      }
      res.send({
        polls: polls
      })
    })
  },

  async getPoll(req, res) {
    await Poll.findById(req.params.pollId, (err, poll) => {
      if (err) {
        return res.status(500).send({
          error: 'Cannot retrieve poll'
        })
      }
      res.send({
        poll: poll
      })
    })
  },

  async deletePoll(req, res) {
    await Poll.findByIdAndRemove(req.params.pollId , (err, poll) => {
      if (err) {
        return res.status(500).send({
          error: 'Cannot delete poll'
        })
      }
      res.send({
        poll: poll
      })
    })
  },

  async incrementVote(req, res) {
    await Poll.findOneAndUpdate(
      { 'answers._id': req.params.answerId },
      { $inc: { 'answers.$.votes': 1 }}, (err, poll) => {
        if (err) {
          return res.status(500).send({
            error: 'Cannot add vote'
          })
        }
        res.send({
          poll: poll
        })
    })
  },

  async updatePoll(req, res) {
    await Poll.findOneAndUpdate(
      { '_id': req.body._id },
      req.body,
      { new: true, upsert: true, setDefaultsOnInsert: true }, (err, poll) => {
        if (err) {
          return res.status(500).send({
            error: 'Cannot update poll'
          })
        }
        res.send({
          poll: poll
        })
    })
  }

}
