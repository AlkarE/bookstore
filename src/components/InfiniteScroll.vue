<template>
  <div class="loading-content" v-show="scrollDataStatus"></div>
</template>

<script>
import { mapState } from 'vuex'
import { scrollListener } from '@/helpers.js'

export default {
  name: 'InfiniteScroll',
  computed: {
    ...mapState(['scrollDataStatus'])
  },
  mounted () {
    window.addEventListener('scroll', scrollListener(this.scroll), { passive: true })
  },
  methods: {
    scroll () {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.offsetHeight

      if (bottomOfWindow) {
        this.updateData()
      }
    },
    updateData () {
      try {
        this.$store.commit('updateScrollData')
      } catch (er) {
        console.log(er)
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', scrollListener)
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
