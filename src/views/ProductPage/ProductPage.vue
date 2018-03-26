<template>
  <v-container fluid class="app-container">
    <BackBtn />
    <div v-if="!product">loading</div>
    <transition name="fade" appear v-else>
      <v-layout justify-center>
        <v-flex xs2 class="hidden-sm-and-down">
          <AdsView :addsLayout='"column"' />
        </v-flex>
        <v-flex xs10 class="mb-3 py-3">
          <v-card>
            <v-layout class="pa-2" v-bind='binding'>
              <div class="mob-poster-div" v-if="mobilePoster">
                <img
                  :src='require(`../../assets/${product.src}`)'
                  class="mobile-poster"
                >
              </div>
              <v-flex sm3>
                <v-card-media
                  :src='require(`../../assets/${product.src}`)'
                  height="320px"
                  contain
                  v-if="!mobilePoster"
                ></v-card-media>
              </v-flex>
              <v-flex sm8 class="list_view-top">
                <p class="headline tit-dark">{{product.Bookname}}</p>
                <p>{{product.author}}</p>
                <p>{{product.Description}}</p>
                <v-layout wrap class="list_view-bot">
                  <v-flex xs12>
                    <v-layout>
                      <span class="red--text">Цена: {{product.price}} руб.</span>
                      <v-spacer></v-spacer>
                      <v-icon @click="addBookmark" class="cur">bookmark</v-icon>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <p>Поделиться в соц. сетях:</p>
                    <social-sharing
                      :url='path'
                      :title="product.Bookname"
                      :description="product.Description"
                      v-cloak
                      inline-template
                    >
                      <v-layout class="cur" justify-space-between>
                        <network network="facebook" id="facebook" class="pr-1">
                          Facebook
                        </network>
                        <network network="googleplus" id="googleplus" class="px-1">
                          Google +
                        </network>
                        <network network="twitter" id="twitter" class="px-1">
                          Twitter
                        </network>
                        <network network="vk" id="vk" class="px-1">
                          VK
                        </network>
                        <network network="telegram" id="telegram" class="pl-1">
                          Telegram
                        </network>
                      </v-layout>
                    </social-sharing>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
          <AdsView />
        </v-flex>
      </v-layout>
    </transition>
    <RecBooks />
  </v-container>
</template>

<script>
import AdsView from '@/views/Layout/AdsView.vue'
import RecBooks from './RecommendedBooks.vue'
import BackBtn from '@/components/BackBtn'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductPage',
  components: {
    AdsView,
    RecBooks,
    BackBtn
  },
  beforeMount () {
    if (!this.product) {
      if (/^\d+$/.test(this.$route.params.id)) {
        this.$store.dispatch('fetchDirectBook', this.$route.params.id)
      } else return null
    }
  },
  computed: {
    path () {
      return `http://df000.ru/project/bookstore/${this.$route.path}`
    },
    mobilePoster () {
      return this.$vuetify.breakpoint.xs
    },
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding.column = true
      return binding
    },
    ...mapGetters(['product'])
  },
  methods: {
    addBookmark () {
      this.$store.commit('addBookmark', this.product)
    }
  }
}
</script>

<style lang="stylus" scoped>
.mob-poster-div
  text-align center

.mobile-poster
  width 100%
  height auto
  max-width 200px

.container
  padding 6px !important
</style>
