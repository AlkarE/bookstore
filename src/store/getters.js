export const bookData = state => state.bookData

export const fetchedData = state => state.fetchedData

export const themeMode = state => state.themeMode

export const layout = state => state.layout

export const product = state => state.product

export const cart = state => state.cart

export const scrollDataStatus = state => state.scrollDataStatus

export const inCart = state => {
  let book = 0
  for (const k in state.cart) {
    if (state.cart[k].quantity) {
      book++
    }
  }
  state.booksInCart = book
  return state.booksInCart
}

export const allPrice = state => {
  let price = 0
  for (let p in state.cart) {
    if (state.cart[p].quantity) {
      price += state.cart[p].book.price * state.cart[p].quantity
    }
  }
  return price
}

export const userLogged = state => state.userLogged

export const uid = state => state.uid

export const bookmarks = state => state.bookmarks

export const userName = state => state.userName

export const snackbar = state => state.snackbar

export const searchCloseBtn = state => state.searchCloseBtn
