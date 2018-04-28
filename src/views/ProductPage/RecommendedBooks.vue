<template>
  <v-layout :class="binding" justify-center align-center>
    <v-flex xs10>
      <v-layout justify-center :class="binding === true ? '' : 'wrap'">
        <v-flex xs10 offset-xs1>
          <p>Рекомендуем ознакомиться:</p>
        </v-flex>
        <v-flex md3 class="ma-2 rec-up" v-for="book in recBooks" :key="book.id">
          <v-card class="pa-2 text-xs-center">
            <img class="rec-image" :src="require(`@/assets/${book.src}`)">
            <p class="tit">{{book.Bookname}}</p>
            <v-layout class="px-2">
              <v-btn icon alt="Подробнее" title="Подробнее" @click='goToRecBook(book.id)'>
                <img v-if='themeMode === `theme--dark`' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E" alt="description">
              <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E" alt="description">
              </v-btn>
              <v-spacer></v-spacer>
              <span class="mt-3">{{book.price}} руб.</span>
              <v-spacer></v-spacer>
              <v-flex></v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecommendedBooks',
  data: () => ({
    books: []
  }),
  mounted () {
    setTimeout(this.getRndBooks, 900)
  },
  computed: {
    recBooks () {
      return this.books
    },
    binding () {
      const cssClass = this.$vuetify.breakpoint.mdAndUp ? 'justify-end' : 'justify-start'
      return cssClass
    },
    ...mapGetters(['fetchedData', 'themeMode'])
  },
  methods: {
    goToRecBook (id) {
      this.$router.push({ path: `/book/${id}` })
      this.$store.dispatch('fetchDirectBook', id)
    },
    getRndBooks () {
      /* Находим 3 случайных числа */
      const rnd1 = Math.floor(Math.random() * this.fetchedData.length)
      const rnd2 = Math.floor(rnd1 / 2)
      const rnd3 = this.fetchedData.length - rnd1
      /*
        Получаем id текучего пути (это строка!), где id - индекс книги в массиве state.fetchedData
      */
      const routeId = this.$route.params.id
      const id = this.fetchedData.findIndex(book => book.id === +routeId)
      // console.table([rnd1, rnd2, rnd3, id])
      /*
        проверяем случайные числа на равенство с id, а также на границы диапазона
      */

      // первая книга - рекомендация
      if (id !== rnd1 && id !== this.fetchedData.length) {
        this.$set(this.books, 0, this.fetchedData[rnd1])
      } else {
        this.$set(this.books, 0, this.fetchedData[rnd1 - 1])
      }

      // вторая книга - рекомендация
      if (id !== rnd2 && id !== 0 && rnd1 - 1 !== rnd2) {
        this.$set(this.books, 1, this.fetchedData[rnd2])
      } else if (rnd2 !== 0) {
        this.$set(this.books, 1, this.fetchedData[rnd2 - 1])
      } else this.$set(this.books, 1, this.fetchedData[1])

      // третья книга - рекомендация
      /* проверяем, чтобы книги с индексом rnd1/rnd2 и rnd3 не повторялись */
      if (id !== rnd3 && id > 0 && rnd3 !== rnd1 && rnd2 !== rnd3 && rnd1 !== rnd2) {
        this.$set(this.books, 2, this.fetchedData[rnd3])
      } else {
        this.$set(this.books, 2, this.fetchedData[rnd2 + 1])
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getRndBooks()
    }
  },
  beforeDestroy () {
    this.books = null
  }
}
</script>

<style scoped>
.rec-image {
  width: 100%;
  height: auto;
  max-width: 140px;
}

.rec-up {
  animation: up .6s;
}

@keyframes up {
  0% { transform: translateY(3000px) }
  50% { transform: translateY(-40px) }
  75% { transform: translateY(50px) }
  100% { transform: translateY(0) }
}
</style>
