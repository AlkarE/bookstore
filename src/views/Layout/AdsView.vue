<template>
  <!-- fake ads block -->
  <v-container fluid class="re_ad">
    <v-layout v-bind="binding" justify-center>
      <v-flex class="ma-1" @click='goAds("ticket")' @click.middle='goAds("ticket")'>
        <v-card class="cur pa-1 elevation-1" title="Перейти по ссылке">
          <p align='center' class="re_ad--title">Fake ads</p>
          <v-card-media
            src='http://img10.lostpic.net/2017/09/21/b3980a41d38a60bfe0d0b9e6fa62e3b8.png'
            contain
            height=100
          ></v-card-media>
          <v-card-text class="text-xs-center mb-0">
            Покупайте билеты на поезда тольуо у НАС!
            <br/>
            <a href="http://df000.ru/project/ticketstore/" target="_blank">tickets.store</a>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex class="ma-1" @click='goAds("quiz")' @click.middle='goAds("quiz")'>
        <v-card class="cur elevation-1" title="Перейти по ссылке">
          <p align='center' class="re_ad--title mb-1">Проверьте Ваши знания!</p>
          <v-card-media
            src='http://img10.lostpic.net/2017/09/21/240c79cd7c9f762c715b9b99fd73bcc4.jpg'
            contain
            height=100
          ></v-card-media>
          <v-card-text class="text-xs-center mb-0">
            Проверьте Ваши знания по истории Российской империи
            <br/>
            <a href="http://df000.ru/project/rugames/" target="_blank">ruGames</a>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AdsView',
  props: {
    addsLayout: String
  },
  methods: {
    goAds (par) {
      if (par === 'quiz') {
        return window.open('http://df000.ru/project/rugames/')
      } else if (par === 'ticket') {
        return window.open('http://df000.ru/project/ticketstore/')
      }
    }
  },
  computed: {
    binding () {
      const binding = {}
      if (this.addsLayout) binding.column = true
      return binding
    }
  }
}
</script>

<style scoped>
.re_ad {
  position: sticky;
  top: 14%;
}

.re_ad--title {
  font-size: 1.5rem;
  font-weight: 400;
}

.container {
  padding: 6px 8px !important;
}
</style>
