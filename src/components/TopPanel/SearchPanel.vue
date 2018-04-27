<template>
  <v-layout class="ml-3">
    <div style="position:relative">
      <v-text-field
        name="search-input"
        label="Search..."
        id="testing"
        v-model.lazy="search"
        @keyup.enter="searchIt"
      ></v-text-field>
      <div class="input-btn" @click='searchIt' title="Искать"></div>
    </div>
    <transition name='slide-x-transition'>
      <v-btn
        icon
        class="mt-3"
        v-if="this.$store.getters.searchCloseBtn"
        @click="clearSearch">
        <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="close" title="close">
        <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="close" title="close">
      </v-btn>
    </transition>
  </v-layout>
</template>

<script>
export default {
  name: 'SearchPanel',
  data: () => ({
    search: ''
  }),
  computed: {
    themeMode () {
      return this.$store.getters.themeMode
    }
  },
  methods: {
    searchIt () {
      if (!this.search) return

      const searchResult = this.$store.getters.fetchedData.filter(book => {
        return book.Bookname.toLowerCase() === this.search.toLowerCase()
      })
      this.$store.commit('showSearch', searchResult)
      this.$store.commit('changeLayout', true)
    },
    clearSearch () {
      this.search = ''
      this.$store.commit('hideSearchResults')
      this.$store.commit('changeLayout')
    }
  }
}
</script>

<style scoped>
.input-btn {
  position: absolute;
  top: 28%;
  z-index: 6;
  right: 3px;

  width: 22px;
  height: 22px;
  font-size: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
}

.input-btn::after {
  content: url("data:image/svg+xml,%3Csvg fill='%239c27b0' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  position: absolute;
  top: 0px;
  left: 2px;
  max-width: 24px;
  max-height: 24px;
}
</style>
