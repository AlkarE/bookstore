import router from '../router'
import axios from 'axios'

const DATA_URL = `https://bookstore-backend-demo.herokuapp.com/books`

export const fetchBookData = async ({ state, commit }) => {
  try {
    const res = await axios.get(DATA_URL)
    const data = res.data.books
    state.fetchedData = Array.from(data)
    commit('updateScrollData', data)
    commit('makeCart')
  } catch (err) {
    global.console.log(err)
    throw new Error(err)
  }
}

export const fetchDirectBook = async ({ state }, id) => {
  try {
    const res = await axios.get(`${DATA_URL}/${id}`)
    state.product = res.data
  } catch (err) {
    global.console.log(err)
    throw new Error(err)
  }
}

export const changeLayout = ({ commit }) => {
  commit('changeLayout')
  commit('clearScrollData')
  commit('updateScrollData')
}

export const getProductId = ({ state, commit }, id) => {
  state.product = null
  state.product = state.fetchedData.find(book => book.id === id)
  state.product = state.product
  router.push(`/book/${id}`)
  commit('clearScrollData')
}

export const logIn = ({ state, commit }, { name, pass }) => {
  // global.console.log(`name = ${name}, pass = ${pass}`)
  if (/test/i.test(name.trim()) && /test/i.test(pass)) {
    state.userLogged = true
    state.uid = 1
    state.userName = name
  }
  commit('showNotification', {
    text: `Вы вошли как ${state.userName}`,
    color: 'success'
  })
}

export const signUp = ({ state }, { name, email, pass }) => {
  // sign up ?
}

export const logOut = ({ state }) => {
  state.uid = null
  state.userName = ''
  state.userLogged = false
  state.cart = {
    0: {
      book: undefined,
      quantity: 0
    }
  }
  router.push('/')
}
