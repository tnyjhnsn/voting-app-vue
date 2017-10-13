<template>
  <div>
   <v-toolbar class="pink">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline">{{ poll.question }}</h3>
      </v-card-title>
      <v-list>
        <template v-for="(answer, index) in poll.answers">
          <v-list-tile avatar :key="answer._id" @click="saveVote(index)">
            <v-list-tile-avatar v-if="showChart">
                <v-icon medium :class="getColour(index)">lens</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ answer.answer }}</v-list-tile-title>
              <v-list-tile-sub-title>Total votes: {{ answer.votes }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn v-if="checked == index" icon>
                <v-icon small class="green--text">done</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="answer._id"></v-divider>
        </template>
      </v-list>
      <v-card-actions>
        <v-btn flat class="blue--text" v-if="showMenu" @click="editPoll()">Edit Poll</v-btn>
        <v-btn flat class="blue--text" v-if="showMenu" @click="deletePoll()">Delete Poll</v-btn>
        <v-spacer />
        <v-btn flat class="orange--text" @click="cancel()">Cancel</v-btn>
        <v-btn flat class="green--text" @click="incrementVote()">Add Vote</v-btn>
      </v-card-actions>
      <std-dialog v-model="alert" headline="Missing Vote" @closeDialog="closeDialog()"></std-dialog>
      <vue-chart v-if="showChart"
        :chart-type="chartType"
        :columns="columns"
        :rows="rows"
        :options="options"
        :bind="true">
      </vue-chart>
    </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PollService from '@/services/PollService'
import StdDialog from '@/components/children/StdDialog'

export default {

  props: [
    'title'
  ],

  components: {
    StdDialog
  },

  data() {
    return {
      poll: {},
      checked: null,
      showMenu: null,
      showChart: 0,
      chartType: 'PieChart',
      columns: [
        { type: 'string' },
        { type: 'number' }
      ],
      rows: [],
      options: {
        height: 400,
        chartArea: { width: '100%', height: '90%' },
        legend: 'none',
        colors: ['#6740b4', '#2c98f0', '#f05830', '#febf2e', '#50ad55'],
        pieHole: 0.4
      },
      colours: ['deep-purple', 'blue', 'deep-orange', 'amber', 'green'],
      alert: {
        status: false,
        message: ''
      }
    }
  },

  async mounted() {
    const response = await PollService.viewPoll(this.$route.params.pollId)
    this.poll = response.data.poll
    this.rows = this.poll.answers.map((answer) => {
      this.showChart += answer.votes
      return [
        answer.answer,
        answer.votes
      ]
    })
    if (this.$store.state.isLoggedIn) {
      this.showMenu = this.$store.state.user._id === this.poll.owner || false
    }
  },

  methods: {

    getColour(index) {
      return `${this.colours[index]}--text`
    },

    editPoll() {
      this.$router.push({
        path: `/poll/edit/${this.poll._id}`
      })
    },

    async deletePoll() {
      try {
        await PollService.deletePoll(this.poll._id)
        this.$router.push({
          path: '/polls'
        })
      } catch (error) {
        this.alert.message = error.response.data.error
        this.alert.status = true
      }
    },

    saveVote(index) {
      this.checked = index
    },

    async incrementVote() {
      if (this.checked === null) {
        this.alert.message = 'Please select an answer to make your vote count'
        this.alert.status = true
        return
      }
      try {
        await PollService.incrementVote(this.poll.answers[this.checked]._id)
        this.$router.push({
          path: '/polls'
        })
      } catch (error) {
        this.alert.message = error.response.data.error
        this.alert.status = true
      }
    },

    cancel() {
      this.$router.push({
        path: '/polls'
      })
    },

    closeDialog() {
      this.alert.status = false
    }
  }
}
</script>

<style scoped></style>
