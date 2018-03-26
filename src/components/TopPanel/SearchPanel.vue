<template>
  <v-layout class="ml-3">
    <v-text-field
      name="search-input"
      label="Search..."
      id="testing"
      v-model.lazy="search"
      @keyup.enter="searchIt"
      :append-icon="'search'"
      :append-icon-cb="searchIt"
    ></v-text-field>
    <transition name='slide-x-transition'>
      <v-btn
        icon
        class="mt-3"
        v-if="this.$store.getters.searchCloseBtn"
        @click="clearSearch">
        <v-icon>close</v-icon>
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
  methods: {
    searchIt () {
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
