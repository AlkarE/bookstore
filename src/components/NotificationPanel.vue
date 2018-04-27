<template>
  <v-snackbar
    :timeout="1500"
    :color="this.$store.state.snackbar.color"
    v-model="this.$store.state.snackbar.status"
  >
    <v-layout justify-center>
      <span>{{ this.$store.state.snackbar.text }}</span>
    </v-layout>
  </v-snackbar>
</template>
