<template>
  <div>
    <div v-if="searchStatus">
      <SearchPanel />
    </div>
    <v-layout align-center justify-center v-else>
      <v-btn
        icon
        @click='showSearch'
        title="Search"
        class="hidden-sm-and-up"
      >
        <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="search">
        <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="search">
      </v-btn>
      <v-btn @click='changeTheme' icon title="Change theme">
        <img
          :src="themeMode === 'theme--dark'
            ? require('../../assets/icons/theme_light.svg')
            : require('../../assets/icons/theme_dark.svg')"
          alt="Change theme"
          title="Change theme"
          class="btn-icons"
        >
      </v-btn>
      <v-btn @click='changeLayout' icon title="Change layout">
        <img
          :src="layout === 'grid-view'
            ? require('../../assets/icons/layout_list.svg')
            : require('../../assets/icons/layout_grid.svg')"
          alt="Change layout"
          title="Change layout"
          class="btn-icons"
        >
      </v-btn>
      <v-btn icon v-if='userLogged' @click='goUserProfile' title="Просмотреть профиль">
        <!-- User picture -->
        <img
          :src="themeMode === 'theme--dark'
          ? require('../../assets/icons/ac-no-ava_d.svg')
          : require('../../assets/icons/ac-no-ava_l.svg')"
          alt="Просмотреть профиль"
          class="profile_img"
        >
      </v-btn>

      <v-btn icon @click.stop="dialog = true" v-else title="Войти">
        <img
          :src="themeMode === 'theme--dark'
          ? require('../../assets/icons/ac-no-ava_d.svg')
          : require('../../assets/icons/ac-no-ava_l.svg')"
          alt="Просмотреть профиль"
          class="profile_img"
        >
      </v-btn>
      <v-dialog v-model="dialog" :max-width='380' v-if="dialog">
        <v-card>
          <component :is="com" @reg='reg' @close="close" class="dialog-bounce"></component>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <CartPre/>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchPanel from '../../components/TopPanel/SearchPanel'
import CartPre from '../../components/TopPanel/CartPre'

const LogIn = () => import(/* webpackChunkName: "authDialogs" */ '@/components/Auth/LogIn')
const RegForm = () => import(/* webpackChunkName: "authDialogs" */ '@/components/Auth/RegForm')

const closeSearchPanelListener = function (vm) {
  const contentTop = document.getElementById('listener-top')
  const contentBot = document.getElementById('listener-bot')
  contentTop.addEventListener('click', closeSeachPanel.bind(vm))
  contentBot.addEventListener('click', closeSeachPanel.bind(vm))
}

const closeSeachPanel = function () {
  this.$data.searchStatus = false
}

export default {
  name: 'ToggleBtns',
  components: {
    'log-in': LogIn,
    'reg-form': RegForm,
    SearchPanel,
    CartPre
  },
  data: () => ({
    dialog: false,
    com: 'log-in',
    searchStatus: false
  }),
  computed: {
    ...mapGetters(['layout', 'themeMode', 'userLogged', 'uid'])
  },
  watch: {
    searchStatus (status) {
      if (status === true) {
        closeSearchPanelListener(this)
      }
    }
  },
  methods: {
    changeTheme () {
      this.$store.commit('changeTheme')
    },
    changeLayout () {
      this.$store.dispatch('changeLayout')
    },
    goUserProfile () {
      this.$router.push(`/user/${this.uid}`)
    },
    close () {
      this.dialog = false
      this.com = 'log-in'
    },
    reg () {
      this.com = 'reg-form'
    },
    showSearch () {
      this.searchStatus = true
    }
  }
}
</script>

<style scoped>
.profile_img {
  max-width: 36px;
  height: auto;
}

.dialog-bounce {
  animation: bounce .6s;
}

@keyframes bounce {
  0% { transform: translateY(-1000px) }
  50% { transform: translateY(40px) }
  75% { transform: translateY(-50px) }
  100% { transform: translateY(0) }
}
</style>
