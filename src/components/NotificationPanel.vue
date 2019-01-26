<template>
  <v-snackbar
    :timeout="1500"
    :color="snackbar.color"
    v-model="snackbar.status"
  >
    <v-layout justify-center>
      <span>{{ snackbar.text }}</span>
    </v-layout>
  </v-snackbar>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters(['snackbar'])
  }
}
</script>
