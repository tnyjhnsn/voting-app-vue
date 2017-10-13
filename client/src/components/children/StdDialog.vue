<template>
    <v-dialog :value="value.status" lazy absolute persistent>
      <v-card>
        <v-card-title><div class="headline">{{ headline }}</div></v-card-title>
          <v-container><span v-html="value.message"></span></v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn flat class="green--text darken-1" @click="$emit('closeDialog')">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: [
    'headline',
    'value'
  ]
}
</script>

<style scoped></style>
