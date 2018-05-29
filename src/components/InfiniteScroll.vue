<template>
  <div class="loading-content" v-show="scrollDataStatus"></div>
</template>

<script>
import { mapState } from 'vuex'
import scrollMonitor from 'scrollmonitor'
/* eslint-disable */

export default {
  name: 'InfiniteScroll',
  computed: {
    ...mapState(['scrollDataStatus'])
  },
  methods: {
    updateData () {
      setTimeout(() => {
        this.$store.commit('updateScrollData')
      }, 300)
    }
  },
  mounted () {
    setTimeout(() => {
      const elem = document.querySelector('.loading-content')
      const watcher = scrollMonitor.create(elem)
      const vm = this
      watcher.enterViewport(() => {
        vm.updateData()
      })
    }, 600)
  }
}
</script>

<style scoped>
.loading-content {
  display: block;
  position: absolute;
  bottom: 40px;
  text-align: center;
  left: 50%;
  height: 40px;
  min-width: 20px;
  background: url('../assets/icons/spinning-circles.svg') center center no-repeat;
  background-size: 38px;
}
</style>