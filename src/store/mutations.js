import Vue from 'vue'

const LOAD_BOOKS = 8

export const changeTheme = state => {
  state.themeMode === 'theme--dark' ? state.themeMode = 'theme--light' : state.themeMode = 'theme--dark'
}

export const changeLayout = (state, payload = undefined) => {
  if (payload) {
    state.layout = 'search-results'
  } else {
    if (state.layout === 'grid-view') {
      state.layout = 'list-view'
    } else {
      state.layout = 'grid-view'
    }
  }
}

// Infinite scroll update function
export const updateScrollData = state => {
  if (state.bookData.length < state.fetchedData.length) {
    const append = state.fetchedData.slice(state.bookData.length, state.bookData.length + LOAD_BOOKS)
    state.bookData = state.bookData.concat(append)
    if (state.bookData.length === state.fetchedData.length) {
      state.scrollDataStatus = false
    } else {
      state.scrollDataStatus = true
    }
  } else {
    state.scrollDataStatus = false
  }
}

export const clearScrollData = state => (state.bookData = [])

export const priceSort = (state, payload) => {
  if (payload === 'payload') {
    state.fetchedData = state.fetchedData.sort((a, b) => b.price - a.price)
  } else {
    state.fetchedData = state.fetchedData.sort((a, b) => a.price - b.price)
  }
}

export const makeCart = state => {
  /*
    Из массива fetchedData делаем объект вида
    cart = {
      index : {
        'book': book[index],
        'quantity': 0
      }
    }
  */
  state.fetchedData.forEach((val, _) => {
    Vue.set(state.cart, _, { 'book': val })
  })

  for (const key in state.cart) {
    Vue.set(state.cart[key], 'quantity', 0)
  }
}

export const addToCart = (state, payload) => {
  for (const i in state.cart) {
    if (state.cart[i].book.Bookname === payload) {
      state.cart[i].quantity++
    }
  }
}

/*
  Удаляет 1 копию книги из некоторого числа в корзине
*/
export const removeFromCart = (state, payload) => {
  for (const i in state.cart) {
    if (state.cart[i].book.Bookname === payload) {
      state.cart[i].quantity--
    }
  }
}

// Удаление всех копий книги
export const deleteFromCart = (state, bookName) => {
  for (const key in state.cart) {
    if (state.cart[key].book.Bookname === bookName) {
      state.cart[key].quantity = 0
    }
  }
}

export const showSearch = (state, search) => {
  state.search = search
  state.searchCloseBtn = true
}

export const hideSearchResults = state => {
  state.searchCloseBtn = false
  state.search = ''
}

export const addBookmark = (state, product) => {
  if (state.bookmarks.includes(product)) {
    showNotification(state, {
      text: 'Уже в закладках',
      color: 'error'
    })
  } else {
    state.bookmarks.push(product)
    showNotification(state, {
      text: 'Добавлено в закладки',
      color: 'success'
    })
  }
}

export const showNotification = (state, { text, color }) => {
  state.snackbar.status = true
  state.snackbar.color = color
  state.snackbar.text = text
}
