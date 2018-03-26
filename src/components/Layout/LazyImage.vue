<template>
  <!-- <img class="image" :src="srcImage" :alt='alt'> -->
  <v-card-media :src='lazySrc' :height='320' :contain='true' ></v-card-media>
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

<style>

</style>
