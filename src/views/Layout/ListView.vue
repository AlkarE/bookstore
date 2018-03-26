<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 v-for="book in bookData" :key="book.Bookname">
        <v-card class="my-2">
          <v-layout v-bind='binding'>
            <v-flex xs12 sm2>
              <LazyImage :src="require(`@/assets/${book.src}`)" :alt="book.Bookname" />
            </v-flex>
            <v-flex xs12 sm10 class="list_view-top">
              <div>
                <div
                  :class="themeMode === 'theme--dark' ? 'tit headline' : 'tit-dark headline'"
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
                  <v-icon>description</v-icon>
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

export default {
  name: 'ListView',
  components: {
    BuyBtn,
    LazyImage
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding.wrap = true
      return binding
    },
    ...mapGetters(['bookData', 'themeMode'])
  },
  methods: {
    ...mapActions(['getProductId'])
  }
}
</script>
