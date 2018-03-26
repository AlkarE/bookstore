<template>
  <v-container fluid>
    <v-flex v-if="this.$store.state.search.length > 0">
      <v-flex xs12 v-for="book in this.$store.state.search" :key="book.Bookname">
        <v-card class="my-2">
          <v-layout v-bind='binding'>
            <v-flex xs12 sm2>
              <div class="text-xs-center mt-1">
                <img :src="require(`@/assets/${book.src}`)" :alt="book.Bookname" />
              </div>
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
    </v-flex>
    <v-flex v-else>
      Нет таких книг
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuyBtn from '../../components/Layout/BuyBtn'

export default {
  name: 'search-results',
  components: {
    BuyBtn
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

<style scoped>
img {
  max-width: 200px;
}
</style>
