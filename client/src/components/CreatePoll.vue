<template>
  <credentials>
    <create-poll title="Create Poll"></create-poll>
  </credentials>
</template>

<script>
import Credentials from '@/components/children/Credentials'
import CreatePoll from '@/components/children/CreatePoll'

export default {
  components: {
    Credentials,
    CreatePoll
  }
}
</script>

<style scoped></style>