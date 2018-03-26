<template>
  <v-app id="app" :class="themeMode" v-cloak app>
    <!-- Header / navigation component is here -->
    <AppHeader />
    <NotificationPanel />

    <v-content class="mt-3" app id="content">
      <router-view/>
    </v-content>

    <scrollUp />
    <!-- Возможно тут должен быть футер -->
  </v-app>
</template>

<script>
/* @ is an alias to ./src */
import AppHeader from '@/components/AppHeader.vue'
import scrollUp from '@/components/scrollUp.vue'
import { mapGetters } from 'vuex'
import NotificationPanel from '@/components/NotificationPanel'

export default {
  name: 'App',
  components: {
    AppHeader,
    scrollUp,
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
