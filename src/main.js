import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import SocialSharing from 'vue-social-sharing'
import { LazyImageDirective } from '@/helpers'

Vue.use(SocialSharing)
Vue.directive('lazyload', LazyImageDirective)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate () {
    this.$store.dispatch('fetchBookData')
  },
  render: h => h(App)
}).$mount('#app')
