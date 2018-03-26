<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md3 v-for="book in bookData" :key="book.Bookname">
        <v-card class="pa-2 text-xs-center">
          <LazyImage :src="require(`@/assets/${book.src}`)" :alt="book.Bookname" />
          <p
            :class="themeMode === 'theme--dark' ? 'tit' : 'tit-dark'"
            :title='book.author'>{{book.Bookname}}
          </p>
          <v-layout class="pa-2">
            <v-btn icon alt="Подробнее" title="Подробнее" @click='getProductId(book.id)'>
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuyBtn from '../../components/Layout/BuyBtn'
import LazyImage from '../../components/Layout/LazyImage'

export default {
  name: 'GridView',
  components: {
    BuyBtn,
    LazyImage
  },
  computed: {
    ...mapGetters(['bookData', 'themeMode'])
  },
  methods: {
    ...mapActions(['getProductId'])
  }
}
</script>

<style scoped>
/* img {
  max-height: 320px;
  max-width: 230px;
}

img:hover {
  max-width: 330px;
  height: auto;
} */
</style>
