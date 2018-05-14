<template>
  <img
    class="back-btn"
    :src='themeMode === `theme--dark`
      ? require("../assets/icons/back_l.svg")
      : require("../assets/icons/back_d.svg")'
    alt='go back'
    title="На главную"
    @click="goBack"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'goBackBtn',
  computed: {
    ...mapGetters(['themeMode'])
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.back-btn {
  position: fixed;
  left: 5px;
  top: 90px;
  cursor: pointer;
  z-index: 9999;
  max-width: 70px;
  width: 100%;
  height: 40px;
}
</style>
