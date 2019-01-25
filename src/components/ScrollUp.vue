<template>
  <img
    id="scrollup"
    :class="scrollUpClass"
    src="../assets/icons/up.svg"
    alt="Прокрутить вверх"
    @click="goTop"
  />
</template>

<script>
import { scrollListener } from '@/helpers.js'

export default {
  name: 'scrollUp',
  data: () => ({
    classActive: false
  }),
  mounted () {
    window.addEventListener('scroll', scrollListener(this.scrollListener), { passive: true })
  },
  computed: {
    scrollUpClass () {
      return this.classActive ? 'active' : 'non-active'
    },
  },
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    scrollListener () {
      if (window.scrollY > 90) {
        this.classActive = true
      } else this.classActive = false
    }
  },
  destroyed () {
    window.removeEventListener('scroll', scrollListener)
  }
}
</script>

<style lang="stylus" scoped>
#scrollup {
  position: fixed;
  opacity: 0.65;
  border-radius: 5px;
  left: 5px;
  bottom: 5px;
  cursor: pointer;
  z-index: 9999;
  max-width: 50px;
  opacity: 0.65
  transition opacity .3s easy-in
  &:hover {
    opacity: 1
  }
}

.non-active {
  opacity 0
  visibility hidden
  pointer-events none
}

.active {
  opacity 1
  visibility visible
  pointer-events auto
}

@media only screen and (max-width: 570px){
  #scrollup {
    padding: 0;
    left: 3px;
    bottom: 3px;
    max-width: 35px;
  }
}
</style>
