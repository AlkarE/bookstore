<template>
  <section>
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
        <v-icon>search</v-icon>
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
          <component :is="com" @reg='reg' @close="close"></component>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <CartPre/>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LogIn from '@/components/Auth/LogIn'
import RegForm from '@/components/Auth/RegForm'
import SearchPanel from '../../components/TopPanel/SearchPanel'
import CartPre from '../../components/TopPanel/CartPre'

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
      // this.$refs.form.reset()
      this.dialog = false
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
</style>
