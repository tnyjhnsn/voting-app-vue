<template>
  <div>
    <v-card>
      <v-card-title primary-title>
          <h3 class="headline mb-0">{{ title }}</h3>
      </v-card-title>
        <v-list>
          <v-container>
            <v-text-field label="Question" v-model="poll.question" />
          </v-container>
          <v-list-tile v-for="(answer, index) in poll.answers" :key="index">
            <v-text-field label="Answer" v-model="answer.answer" />
            <v-btn icon ripple @click="removeAnswer(index)">
              <v-icon medium class="grey--text text--lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      <v-card-actions>
        <v-btn flat class="blue--text" @click="addAnswer()">Add Answer</v-btn>
        <v-spacer />
        <v-btn flat class="orange--text" @click="cancel()">Cancel</v-btn>
        <v-btn flat class="green--text" @click="savePoll()">Save Poll</v-btn>
      </v-card-actions>
      <std-dialog v-model="alert" headline="Whoa" @closeDialog="closeDialog()"></std-dialog>
    </v-card>
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
      editing: false,
      poll: {
        owner: this.$store.state.user._id,
        question: null,
        answers: [
          { answer: null, votes: 0 },
          { answer: null, votes: 0 }
        ]
      },
      alert: {
        status: false,
        message: ''
      }
    }
  },

  async mounted() {
    if (this.$route.params.pollId) {
      this.editing = true
      try {
        const response = await PollService.poll(this.$route.params.pollId)
        this.poll = response.data.poll
      } catch (error) {
        this.error = error.response.data.error
        this.alert.status = true
      }
    }
  },

  methods: {

    addAnswer() {
      if (this.poll.answers.length === 5) {
        this.alert.message = 'A poll should be maximum 5 answers'
        this.alert.status = true
        return
      }
      this.poll.answers.push({
        answer: null,
        votes: 0
      })
    },

    removeAnswer(index) {
      if (this.poll.answers.length === 2) {
        this.alert.message = 'A poll needs at least 2 answers to be useful'
        this.alert.status = true
        return
      }
      this.poll.answers.splice(index, 1)
    },

    savePoll() {
      if (this.editing) {
        this.doSave(PollService.update)
      } else {
        this.doSave(PollService.create)
      }
    },

    async doSave(save) {
      try {
        await save(this.poll)
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
