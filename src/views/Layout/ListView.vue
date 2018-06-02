<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 v-for="book in bookData" :key="book.Bookname">
        <v-card class="my-2">
          <v-layout v-bind='binding'>
            <v-flex xs12 sm2 class="list_view__img-center">
              <LazyImage :src="require(`@/assets/${book.src}`)" :alt="book.Bookname" />
            </v-flex>
            <v-flex xs12 sm10 class="list_view-top">
              <div>
                <div
                  :class="themeMode === 'theme--dark' ? 'titl headline' : 'titl--dark headline'"
                >
                  {{book.Bookname}}
                </div>
                <p>{{book.author}}</p>
              </div>
              <div>
                <p>{{book.Description}}</p>
              </div>
              <v-layout class="list_view-bot">
                <p class="mt-3"><span class="blue--text">Цена:</span> {{book.price}} руб.</p>
                <v-spacer></v-spacer>
                <v-btn icon alt="Подробнее" title="Подробнее" @click='getProductId(book.id)'>
                  <img v-if='themeMode === `theme--dark`' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E" alt="description">
                  <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E" alt="description">
                </v-btn>
                <BuyBtn :item='book.Bookname' />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuyBtn from '../../components/Layout/BuyBtn'
import LazyImage from '../../components/Layout/LazyImage'
import viewportListener from '@/mixins/viewportListener'

export default {
  name: 'ListView',
  components: {
    BuyBtn,
    LazyImage
  },
  data: () => ({
    listener: 'wrap'
  }),
  mixins: [viewportListener],
  computed: {
    ...mapGetters(['bookData', 'themeMode'])
  },
  methods: {
    ...mapActions(['getProductId'])
  }
}
</script>

<style scoped>
.list_view__img-center {
  text-align: center;
}
</style>
