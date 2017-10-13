<template>
  <v-toolbar fixed flat class="primary">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <router-link :to="{ path: '/' }">
      <v-toolbar-title class="white--text">Pollster</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn flat class="orange--text" v-if="!this.$store.state.isLoggedIn" :to="{ path: '/register' }">Register</v-btn>
    <v-btn flat class="orange--text" v-if="!this.$store.state.isLoggedIn" :to="{ path: '/login' }">Login</v-btn>
    <v-btn flat class="orange--text" v-if="this.$store.state.isLoggedIn" @click="logout()">Logout</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setToken', null)
      this.$router.push({
        path: '/polls'
      })
    }
  }
}
</script>

<style scoped></style>
