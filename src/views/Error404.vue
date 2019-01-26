<template>
  <div class="error-page">
    <h1>Oops! Page Not Found ):</h1>
    <p>Раз такое дело, то можете посмотреть это видео</p>
    <iframe :width='iframeWidth' height="315" src="https://www.youtube-nocookie.com/embed/aVpJGGQHSqc?rel=0&amp;showinfo=0" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
    <p class="error-page__link">Или же вернуться на <router-link to='/'>главную</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'errorPage',
  computed: {
    iframeWidth () {
      return window.innerWidth < 450 ? '320' : '560'
    }
  }
}
</script>

<style lang="stylus">
.error-page
  margin-top 40px
  padding 8px
  display flex
  flex-direction column
  justify-content center
  align-items center

  &__link
    margin-top 16px
</style>
