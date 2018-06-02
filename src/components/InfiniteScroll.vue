<template>
  <div class="loading-content" v-show="scrollDataStatus"></div>
</template>

<script>
import { mapState } from 'vuex'
import scrollMonitor from 'scrollmonitor'

let elem = null
let watcher = null

export default {
  name: 'InfiniteScroll',
  computed: {
    ...mapState(['scrollDataStatus'])
  },
  methods: {
    updateData () {
      this.$store.commit('updateScrollData')
    }
  },
  mounted () {
    elem = document.querySelector('.loading-content')
    watcher = scrollMonitor.create(elem)
    setTimeout(() => {
      const vm = this
      watcher.enterViewport(() => {
        vm.updateData()
      })
    }, 300)
  },
  beforeDestroy () {
    watcher.destroy()
    elem = null
    watcher = null
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
