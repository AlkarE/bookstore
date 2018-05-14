<template>
  <header>
    <v-navigation-drawer
      temporary
      absolute
      v-model="drawer"
    >
      <v-list class="mt-5">
         <v-list-tile
          v-for="obj in navLinks"
          :href='obj.link'
          :key="obj.title"
        >
          <v-list-tile-action>
            <img :src='obj.icon' alt="icon">
          </v-list-tile-action>
         <v-list-tile-content>
            <v-list-tile-title v-text="obj.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <a v-if="color"><img src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/%3E%3C/svg%3E" alt="menu" @click="drawer = !drawer" class="cur mt-1 hidden-md-and-up"></a>
      <a v-else><img src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/%3E%3C/svg%3E" alt="menu" @click="drawer = !drawer" class="cur mt-1 hidden-md-and-up"></a>
      <v-toolbar-title class="cur" @click='goIndex' @click.middle='goIndex'>Book Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-once class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="obj in navLinks"
          :key='obj.title'
          :href='obj.link'
        >{{obj.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data: () => ({
    drawer: false,
    navLinks: [
      { link: '../../', title: 'Обо мне', icon: `data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E` },
      { link: '../projects-area.html', title: 'Мои проекты', icon: `data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z'/%3E%3C/svg%3E` }
    ]
  }),
  computed: {
    color () {
      return this.$store.getters.themeMode === 'theme--dark'
    }
  },
  methods: {
    goIndex () {
      const hasSearch = () => this.$store.state.search ? this.$store.commit('changeLayout') : false
      this.$router.push({ path: '/' })
      hasSearch()
      this.$store.commit('hideSearchResults')
    }
  }
}
</script>
