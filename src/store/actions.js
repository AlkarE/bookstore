import router from '../router'

const DATA_URL = `http://159.65.201.166:3000/`
// const DATA_URL = `http://localhost:3000/`

export const fetchBookData = async ({state, commit}) => {
  try {
    const opt = {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    }
    const res = await fetch(DATA_URL, opt)
    const data = await res.json()
    state.fetchedData = await Array.from(data)
    await commit('updateScrollData', data)
    await commit('makeCart')
  } catch (err) {
    global.console.log(err)
    throw new Error(err)
  }
}

export const fetchDirectBook = async ({state}, id) => {
  try {
    const opt = {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    }
    const res = await fetch(DATA_URL, opt)
    const data = await res.json()
    const bookArr = await Array.from(data)
    state.product = await bookArr.find(book => book.id === +id)
  } catch (err) {
    global.console.log(err)
    throw new Error(err)
  }
}

export const changeLayout = ({commit}) => {
  commit('changeLayout')
  commit('clearScrollData')
  commit('updateScrollData')
}

export const getProductId = async ({state, commit}, id) => {
  state.product = await null
  state.product = await state.fetchedData.filter(book => {
    return book.id === id
  })
  state.product = await state.product[0]
  await router.push(`/book/${id}`)
  commit('clearScrollData')
}

export const logIn = ({state, commit}, {name, pass}) => {
  // global.console.log(`name = ${name}, pass = ${pass}`)
  if (name.trim() === 'test' && pass === 'test') {
    state.userLogged = true
    state.uid = 1
    state.userName = name
  }
  commit('showNotification', {
    text: `Вы вошли как ${state.userName}`,
    color: 'success'
  })
}

export const signUp = ({state}, {name, email, pass}) => {
  // sign up ?
}

export const logOut = ({state}) => {
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
