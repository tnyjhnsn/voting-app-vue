<template>
  <div id="app">
    <v-app dark>
      <nav-bar />
        <main>
          <v-container>
            <router-view></router-view>
          </v-container>
        </main>
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style></style>
