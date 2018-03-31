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
            <v-icon light v-html="obj.icon"></v-icon>
          </v-list-tile-action>
         <v-list-tile-content>
            <v-list-tile-title v-text="obj.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <v-btn
        icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>

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
      { link: '../../', title: 'Обо мне', icon: 'home' },
      { link: '../projects-area.html', title: 'Мои проекты', icon: 'build' }
    ]
  }),
  methods: {
    goIndex () {
      const a = () => this.$store.state.search ? this.$store.commit('changeLayout') : false
      this.$router.push({ path: '/' })
      a()
      this.$store.commit('hideSearchResults')
    }
  }
}
</script>
