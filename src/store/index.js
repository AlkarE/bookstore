import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    bookData: [],
    fetchedData: [],
    product: null,
    cart: { // книги в корзине
      0: {
        book: undefined,
        quantity: 0
      }
    },
    booksInCart: 0, // количество книг в корзине
    themeMode: 'theme--dark',
    layout: 'grid-view',
    scrollDataStatus: true,
    userLogged: false,
    uid: Number,
    search: '',
    searchCloseBtn: false,
    bookmarks: [],
    userName: '',
    snackbar: { // notification panel status
      status: false,
      color: '',
      text: ''
    }
  },
  getters,
  mutations,
  actions
})
