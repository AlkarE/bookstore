import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import SocialSharing from 'vue-social-sharing'
import 'babel-polyfill'

import VApp from 'vuetify/es5/components/VApp'
import Vuetify from 'vuetify/es5/components/Vuetify'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VTextField from 'vuetify/es5/components/VTextField'
import VBtn from 'vuetify/es5/components/VBtn'
import VCard from 'vuetify/es5/components/VCard'
import VIcon from 'vuetify/es5/components/VIcon'
import VList from 'vuetify/es5/components/VList'
import VGrid from 'vuetify/es5/components/VGrid'
import VToolbar from 'vuetify/es5/components/VToolbar'
import VDivider from 'vuetify/es5/components/VDivider'
import VFooter from 'vuetify/es5/components/VFooter'
import VDialog from 'vuetify/es5/components/VDialog'
import VMenu from 'vuetify/es5/components/VMenu'
import VSnackbar from 'vuetify/es5/components/VSnackbar'
import VSelect from 'vuetify/es5/components/VSelect'
import VBadge from 'vuetify/es5/components/VBadge'
import VForm from 'vuetify/es5/components/VForm'
import VTabs from 'vuetify/es5/components/VTabs'
import VSubheader from 'vuetify/es5/components/VSubheader'

require('vuetify/src/stylus/app.styl')

Vue.use(Vuetify, {
  components: {
    VApp,
    Vuetify,
    VTextField,
    VFooter,
    VDivider,
    VToolbar,
    VGrid,
    VList,
    VIcon,
    VCard,
    VBtn,
    VNavigationDrawer,
    VDialog,
    VBadge,
    VSelect,
    VSnackbar,
    VMenu,
    VForm,
    VTabs,
    VSubheader
  }
})
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
