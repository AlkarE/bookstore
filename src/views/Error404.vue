<template>
  <div class="error-page">
    <h1>Oops! Page Not Found ):</h1>
    <p>Раз такое дело, то можете посмотреть это видео</p>
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aVpJGGQHSqc?rel=0&amp;showinfo=0" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
    <p class="mt-3">Или же вернуться на <router-link to='/'>главную</router-link></p>
  </div>
</template>

<style lang="stylus" scoped>
.error-page
  margin-top 40px
  display flex
  flex-direction column
  justify-content center
  align-items center
</style>
