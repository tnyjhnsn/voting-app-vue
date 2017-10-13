<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
      </div>
    </v-card-title>
    <v-container>
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" v-model="password" type="password" />
    </v-container>
    <v-card-actions>
      <v-btn flat class="orange--text" @click="handleClick()">{{ title }}</v-btn>
    </v-card-actions>
    <std-dialog v-model="alert" headline="Ooops" @closeDialog="closeDialog()"></std-dialog>
  </v-card>
</template>

<script>
import AuthService from '@/services/AuthService'
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
      email: '',
      password: '',
      alert: {
        status: false,
        message: ''
      }
    }
  },

  methods: {

    async handleClick() {
      try {
        const response = await AuthService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setToken', response.data.token)
        this.$router.push({
          path: 'polls'
        })
      } catch (error) {
        this.alert.message = error.response.data.error
        this.alert.status = true
      }
    },

    closeDialog() {
      this.alert.status = false
    }
  }
}
</script>

<style scoped></style>
