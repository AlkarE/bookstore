<template>
  <v-layout
    align-center
    wrap
    justify-space-around
    class="st_panel my-0 py-0"
    :class="themeMode === 'theme--dark' ? 'st_panel--back_dark' : 'st_panel--back_light'"
  >
    <v-flex xs12 sm3>
      <SortPanel/>
    </v-flex>
    <v-flex xs12 sm3 class="hidden-xs-only">
      <transition name="fade" appear>
        <SearchPanel/>
      </transition>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs12 sm4 md3 lg2>
      <v-layout align-center justify-center>
        <ToggleBtns/>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ToggleBtns from '../../components/TopPanel/ToggleBtns'
import SearchPanel from '../../components/TopPanel/SearchPanel'
import SortPanel from '../../components/TopPanel/SortPanel'
import { mapGetters } from 'vuex'

export default {
  name: 'TopPanel',
  components: {
    SearchPanel,
    SortPanel,
    ToggleBtns
  },
  computed: {
    ...mapGetters(['themeMode'])
  }
}
</script>

<style lang="stylus" scoped>
.st_panel
  position sticky
  top: 0px
  margin-top -10px
  z-index 3

.st_panel--back_dark
  background #303030

.st_panel--back_light
  background #fafafa
</style>
