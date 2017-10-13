<template>
  <v-layout row>
    <v-flex xs12 md6 offset-md3>
   <v-toolbar class="pink">
      <v-toolbar-title class="white--text">Let's vote</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn flat class="white--text" v-if="this.$store.state.isLoggedIn" @click="allPolls()">All Polls</v-btn>
        <v-btn flat class="white--text" v-if="this.$store.state.isLoggedIn" @click="myPolls()">My Polls</v-btn>
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
    this.allPolls()
  },

  methods: {

    viewPoll(pollId) {
      this.$router.push({
        path: `/poll/${pollId}`
      })
    },

    async allPolls() {
      const response = await PollService.list()
      this.polls = response.data.polls
    },

    async myPolls() {
      const response = await PollService.listMy(this.$store.state.user._id)
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