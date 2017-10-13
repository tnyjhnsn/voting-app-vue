<template>
  <v-layout row>
    <v-flex xs12 md6 offset-md3>
   <v-toolbar class="pink">
      <v-toolbar-title class="white--text">Let's vote</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn flat class="white--text" v-if="this.$store.state.isLoggedIn" @click="viewAll()">All Polls</v-btn>
        <v-btn flat class="white--text" v-if="this.$store.state.isLoggedIn" @click="viewMine()">My Polls</v-btn>
        <v-btn flat class="white--text" v-if="this.$store.state.isLoggedIn" @click="createPoll()">Create Poll</v-btn>
    </v-toolbar>
    <v-card>
      <v-card-title primary-title>
          <h3 class="headline">How do you feel about these topics?</h3>
      </v-card-title>
      <v-list>
        <template v-for="poll in polls">
          <v-divider :key="poll._id"></v-divider>
          <v-list-tile avatar :key="poll._id" @click="viewPoll(poll._id)">
            <v-list-tile-content>
              <v-list-tile-title>{{ poll.question }}</v-list-tile-title>
              <v-list-tile-sub-title>Total votes: {{ poll.totalVotes }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PollService from '@/services/PollService'

export default {

  data() {
    return {
      polls: null
    }
  },

  mounted() {
    this.viewAll()
  },

  methods: {

    viewPoll(pollId) {
      this.$router.push({
        path: `/poll/${pollId}`
      })
    },

    async viewAll() {
      const response = await PollService.viewAll()
      this.polls = response.data.polls
    },

    async viewMine() {
      const response = await PollService.viewMine(this.$store.state.user._id)
      this.polls = response.data.polls
    },

    createPoll() {
      this.$router.push({
        path: '/poll/create'
      })
    }
  }
}

</script>

<style scoped></style>