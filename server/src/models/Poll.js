const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: String, required: true },
  answers: [
    {
      answer: { type: String },
      votes: { type: Number }
    }
  ]
}, {
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

PollSchema.virtual('totalVotes').get(function() {
  return this.answers.map(answer => {
    return answer.votes
  }).reduce((sum, value) => sum + value, 0)
})

module.exports = mongoose.model('Poll', PollSchema)
