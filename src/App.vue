<template>
  <v-app v-cloak :class="themeMode" app>
    <AppHeader v-once />
    <NotificationPanel />

    <v-content class="mt-3" app id="content">
      <transition name='fade' appear>
        <router-view/>
      </transition>
    </v-content>

    <ScrollUp />
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import ScrollUp from '@/components/ScrollUp.vue'
import NotificationPanel from '@/components/NotificationPanel'
import { mapGetters } from 'vuex'

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
