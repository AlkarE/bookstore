<template>
  <img
    class="back-btn--svg"
    :src='themeMode === `theme--dark`
      ? require("../assets/icons/back_l.svg")
      : require("../assets/icons/back_d.svg")'
    alt='go back'
    title="Назад"
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
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.back-btn--svg {
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
