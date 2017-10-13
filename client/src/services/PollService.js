import Api from '@/services/Api'

export default {

  createPoll(poll) {
    return Api().post('poll', poll)
  },

  viewAll() {
    return Api().get('/polls')
  },

  viewMine(userId) {
    return Api().get(`/polls/${userId}`)
  },

  viewPoll(pollId) {
    return Api().get(`/poll/${pollId}`)
  },

  deletePoll(pollId) {
    return Api().delete(`/poll/${pollId}`)
  },

  incrementVote(answerId) {
    return Api().put(`/poll/${answerId}`)
  },

  updatePoll(poll) {
    return Api().put('/poll', poll)
  }

}
