<template>
  <v-container fluid class="app-container">
    <BackBtn />
    <div v-if="!product" style="text-align:center">loading...</div>

    <transition name="fade" appear v-else>
      <v-layout justify-center>
        <v-flex xs2 class="hidden-sm-and-down">
          <AdsView :addsLayout='"column"' />
        </v-flex>
        <v-flex xs10 class="mb-3 py-3">
          <v-card v-bind='themeColor'>
            <v-layout class="pa-2" v-bind='binding'>
              <div class="mobile-poster" v-if="mobilePoster">
                <img
                  :src='require(`../../assets/${product.src}`)'
                  class="mobile-poster--img"
                >
              </div>
              <v-flex sm3>
                <v-img
                  :src='require(`../../assets/${product.src}`)'
                  height="320px"
                  contain
                  v-if="!mobilePoster"
                ></v-img>
              </v-flex>
              <v-flex sm8 class="list_view-top">
                <p class="headline titl--dark">{{product.Bookname}}</p>
                <p>{{product.author}}</p>
                <p>{{product.Description}}</p>
                <v-layout wrap class="list_view-bot">
                  <v-flex xs12>
                    <v-layout>
                      <span class="red--text">Цена: {{product.price}} руб.</span>
                      <v-spacer></v-spacer>
                      <BuyBtn :item='product.Bookname' class="buy-btn" />
                      <div @click="addBookmark" class="cur" title="Добавить в закладки">
                        <img v-if='themeMode === `theme--dark`' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="add to bookmark">
                        <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="add to bookmark">
                      </div>
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
                      <div class="cur socials">
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
                      </div>
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
import BuyBtn from '@/components/Layout/BuyBtn'
import viewportListener from '@/mixins/viewportListener'
import themeColor from '@/mixins/themeColor'

export default {
  name: 'ProductPage',
  components: {
    AdsView,
    RecBooks,
    BackBtn,
    BuyBtn
  },
  data: () => ({
    listener: 'column'
  }),
  mixins: [viewportListener, themeColor],
  beforeMount () {
    if (!this.product) {
      if (/^\d+$/.test(Number(this.$route.params.id))) {
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
    ...mapGetters(['product', 'themeMode'])
  },
  methods: {
    addBookmark () {
      this.$store.commit('addBookmark', this.product)
    }
  }
}
</script>

<style lang="stylus" scoped>
.mobile-poster
  text-align center

.mobile-poster--img
  width 100%
  height auto
  max-width 200px

.container
  padding 6px !important

.buy-btn
  margin-top -5px
</style>
