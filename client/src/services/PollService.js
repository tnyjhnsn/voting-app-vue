import Api from '@/services/Api'

export default {

  list() {
    return Api().get('/polls')
  },

  listMy(userId) {
    return Api().get(`/polls/${userId}`)
  },

  create(poll) {
    return Api().post('poll', poll)
  },

  poll(pollId) {
    return Api().get(`/poll/${pollId}`)
  },

  delete(pollId) {
    return Api().delete(`/poll/${pollId}`)
  },

  addVote(answerId) {
    return Api().put(`/poll/${answerId}`)
  },

  update(poll) {
    return Api().put('/poll', poll)
  }

}
