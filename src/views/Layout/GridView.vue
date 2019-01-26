<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md3 v-for="book in bookData" :key="book.Bookname">
        <v-card v-bind='themeColor' class="text-xs-center">
          <LazyImage :src="require(`@/assets/${book.src}`)" :alt="book.Bookname" />
          <p
            :class="themeMode === 'theme--dark' ? 'titl' : 'titl--dark'"
            :title='book.author'>{{book.Bookname}}
          </p>
          <v-layout class="pa-2">
            <v-btn icon alt="Подробнее" title="Подробнее" @click='getProductId(book.id)'>
              <img v-if='themeMode === `theme--dark`' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E" alt="description">
              <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E" alt="description">
            </v-btn>
            <v-spacer></v-spacer>
            <span class="mt-3">{{book.price}} руб.</span>
            <v-spacer></v-spacer>
            <BuyBtn :item='book.Bookname'/>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuyBtn from '@/components/Layout/BuyBtn'
import LazyImage from '@/components/Layout/LazyImage'
import themeColor from '@/mixins/themeColor'

export default {
  name: 'GridView',
  components: {
    BuyBtn,
    LazyImage
  },
  mixins: [themeColor],
  computed: {
    ...mapGetters(['bookData', 'themeMode'])
  },
  methods: {
    ...mapActions(['getProductId'])
  }
}
</script>
