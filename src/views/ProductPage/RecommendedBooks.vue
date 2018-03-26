<template>
  <v-layout :class="binding" justify-center align-center>
    <v-flex xs10>
      <!--  -->
      <v-layout justify-center :class="binding === true ? '' : 'wrap'">
        <v-flex xs10 offset-xs1>
          <p>Рекомендуем ознакомиться:</p>
        </v-flex>
        <v-flex md3 class="ma-2" v-for="book in recBooks" :key="book.id" >
          <v-card class="pa-2 text-xs-center">
            <img class="rec-image" :src="require(`@/assets/${book.src}`)" width="50%" height="50%">
            <p class="tit">{{book.Bookname}}</p>
            <v-layout class="px-2">
              <v-btn icon alt="Подробнее" title="Подробнее">
                <v-icon>description</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <span class="mt-3">{{book.price}} руб.</span>
              <v-spacer></v-spacer>
              <BuyBtn :item='book.Bookname'/>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import BuyBtn from '@/components/Layout/BuyBtn'

export default {
  name: 'RecommendedBooks',
  components: {
    BuyBtn
  },
  data: () => ({
    books: []
  }),
  beforeMount () {
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
  },
  computed: {
    recBooks () {
      return this.books
    },
    binding () {
      const cssClass = this.$vuetify.breakpoint.mdAndUp ? 'justify-end' : 'justify-start'
      return cssClass
    },
    ...mapGetters(['fetchedData'])
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
  max-width: 120px;
}
</style>
