import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  state: {
    user: null,
    token: null,
    isLoggedIn: false
  },

  mutations: {

    setUser(state, user) {
      this.state.user = user
    },

    setToken(state, token) {
      this.state.token = token
      this.state.isLoggedIn = token
    }
  },

  actions: {

    setUser({ commit }, user) {
      commit('setUser', user)
    },

    setToken({ commit }, token) {
      commit('setToken', token)
    }
  }

})
