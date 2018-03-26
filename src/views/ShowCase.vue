<template>
  <v-container fluid class="app-container">
    <v-flex class="hidden-md-and-up" id="listener-top">
      <AdsView />
    </v-flex>
    <TopPanel/>
    <!--  -->
    <v-layout id="listener-bot">
      <v-flex sm12 md10 class="mb-3 py-3">
        <transition name="fade" appear>
          <component :is="layout"></component>
        </transition>
        <InfiniteScroll class="my-3 py-3" v-if="scrollDataStatus" />
      </v-flex>
      <v-flex xs2 class="hidden-sm-and-down">
        <AdsView :addsLayout='"column"' />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TopPanel from '@/views/Layout/TopPanel.vue'
import GridView from '@/views/Layout/GridView.vue'
import ListView from '@/views/Layout/ListView.vue'
import SearchResults from '@/views/Layout/SearchResults.vue'
import AdsView from '@/views/Layout/AdsView.vue'
import InfiniteScroll from '@/components/InfiniteScroll'
import { mapGetters } from 'vuex'

export default {
  name: 'ShowCase',
  components: {
    TopPanel,
    GridView,
    ListView,
    SearchResults,
    AdsView,
    InfiniteScroll
  },
  computed: {
    ...mapGetters(['layout', 'scrollDataStatus'])
  },
  beforeCreate () {
    this.$store.commit('updateScrollData')
  }
}
</script>
