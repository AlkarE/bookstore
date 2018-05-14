<template>
  <!-- <v-card-media :src='lazySrc' :height='320' :alt='this.alt'></v-card-media> -->
  <img :src='lazySrc' :alt='this.alt' class="lazy-img">
</template>

<script>
export default {
  name: 'lazy-image',
  props: {
    src: {
      required: true
    },
    alt: {
      required: true
    }
  },
  data: () => ({
    observer: null,
    intersected: false
  }),
  computed: {
    lazySrc () {
      return this.intersected ? this.src : ''
    }
  },
  mounted () {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0]
      if (image.isIntersecting) {
        this.intersected = true
        this.observer.disconnect()
      }
    })
    this.observer.observe(this.$el)
  },
  destroyed () {
    this.observer.disconnect()
  }
}
</script>

<style lang="stylus" scoped>
.lazy-img
  width 100%
  height auto
  max-height 390px
</style>
