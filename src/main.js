import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import SocialSharing from 'vue-social-sharing'

import Vuetify from 'vuetify'
import 'df000.ru.bookstore/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(SocialSharing)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate () {
    // вызываем действие во вьюксе для получения загрузки книг из json
    this.$store.dispatch('fetchBookData')
  },
  render: h => h(App)
}).$mount('#app')
