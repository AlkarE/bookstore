<template>
  <v-container fluid class="app-container">
    <BackBtn />
    <v-flex class="hidden-md-and-up">
      <AdsView />
    </v-flex>
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout wrap>
              <v-flex xs3 class="text-xs-center">
                <v-flex class="hidden-xs-only">
                  <v-btn @click="logOut">Выйти</v-btn>
                  <p class="text-xs-center headline">Привет, {{this.$store.getters.userName}}</p>
                  <img src="../../assets/icons/ac-no-ava_d.svg" class="profile_img">
                </v-flex>
                <v-layout class="hidden-sm-and-up">
                  <img src="../../assets/icons/ac-no-ava_d.svg" class="profile_img--small">
                  <v-flex>
                    <p class="headline">{{this.$store.getters.userName}}</p>
                  </v-flex>
                  <v-flex offset-xs12>
                    <v-btn @click="logOut" small>Выйти</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm9>
                <v-tabs :scrollable='false' fixed-tabs slider-color="indigo" v-model="tab">
                  <v-tab v-for="a in tabs" :key='a'>
                    <span class="tab__title">{{a}}</span>
                  </v-tab>
                </v-tabs>
                <transition name="fade">
                  <!-- Компонент обертка -->
                  <user-tabs :tab='tab' :tabs='tabs' />
                </transition>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs2 class="hidden-sm-and-down">
        <AdsView :addsLayout='"column"'/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AdsView from '@/views/Layout/AdsView.vue'
import UserTabs from './UserTabs'
import BackBtn from '@/components/BackBtn'

export default {
  name: 'UserProfile',
  components: {
    AdsView,
    UserTabs,
    BackBtn
  },
  data: () => ({
    tabs: ['Корзина', 'Настройки', 'Закладки'],
    tab: ''
  }),
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$store.getters.userLogged === true) {
        return vm.$router.push(to.path)
      } else {
        // global.console.log('no log')
        vm.$router.replace({ path: '/404', query: { redirect: to.fullPath } })
      }
    })
  }
}
</script>

<style lang='stylus' scoped>
.profile_img
  width 150px
  height auto
  &--small
    max-width 50px
    max-height 50px

.tab__title
  font-size 12px !important

  @media screen and (max-width: 600px)
    font-size 10px !important
</style>
