<template>
  <v-app v-cloak :class="themeMode" app>
    <AppHeader />
    <NotificationPanel />

    <v-content class="mt-3" app id="content">
      <router-view/>
    </v-content>

    <ScrollUp />
    <!-- Возможно тут должен быть футер -->
  </v-app>
</template>

<script>
/* @ is an alias to ./src */
import AppHeader from '@/components/AppHeader.vue'
import ScrollUp from '@/components/ScrollUp.vue'
import { mapGetters } from 'vuex'
import NotificationPanel from '@/components/NotificationPanel'

export default {
  name: 'App',
  components: {
    AppHeader,
    ScrollUp,
    NotificationPanel
  },
  computed: {
    ...mapGetters(['themeMode'])
  }
}
</script>

<style src='./assets/style.styl' lang='styl'></style>
<style>
[v-cloak] {
  display:none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Roboto, Georgia, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}
</style>
