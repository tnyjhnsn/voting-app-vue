<template>
  <v-layout row>
    <v-flex xs12 md6 offset-md3>
      <view-poll title="Decisions, decisions..."></view-poll>
    </v-flex>
  </v-layout>
</template>

<script>
import Credentials from '@/components/children/Credentials'
import ViewPoll from '@/components/children/ViewPoll'

export default {
  components: {
    Credentials,
    ViewPoll
  }
}
</script>

<style scoped></style>