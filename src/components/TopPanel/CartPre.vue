<template>
  <div class="ml-1">
    <v-badge color="indigo" overlap>
      <span slot="badge" v-if="inCart">{{inCart}}</span>
      <v-menu offset-y transition="slide-y-transition" :min-width='280' :close-on-content-click='false'>
        <img
          :src="themeMode === 'theme--dark'
          ? require('../../assets/icons/cart_light.svg')
          : require('../../assets/icons/cart_dark.svg')"
          alt="Cart"
          slot="activator"
          class="cart-image"
        >
        <v-list v-if="inCart">
          <template v-for="(book,i) in cart">
            <v-list-tile :key='i' v-if="book.quantity > 0">
              <span>{{book.book.Bookname}}</span>
              <v-spacer></v-spacer>
              <span @click='removeFromCart(book.book.Bookname)' class="cur icon-align">
                <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13H5v-2h14v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="remove" title='Удалить 1 шт'>
                <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13H5v-2h14v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="remove" title='Удалить 1 шт'>
              </span>
              <small v-if="book.quantity > 0">&nbsp;x{{book.quantity}}</small>
              <span @click='addToCart(book.book.Bookname)' class="cur icon-align">
                <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="add" title='Добавить еще'>
                <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="add" title='Добавить еще'>
              </span>
              <span @click='deleteFromCart(book.book.Bookname)' class="cur icon-align">
                <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="delete" title="Убрать из корзины">
                <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="delete" title="Убрать из корзины">
              </span>
            </v-list-tile>
          </template>
          <v-divider></v-divider>
          <div class="pt-2 text-xs-center">
            <span class="cur" @click='goPurchase'>Оформить заказ</span>
          </div>
        </v-list>
        <div class="text-xs-center" v-else>
          <b class="my-3">Тут ничего нет!</b>
        </div>
      </v-menu>
    </v-badge>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CartPre',
  computed: {
    ...mapGetters(['inCart', 'cart', 'themeMode', 'uid'])
  },
  methods: {
    goPurchase () {
      if (typeof this.uid !== 'number') {
        return this.$store.commit('showNotification', {
          text: 'Необходимо войти',
          color: 'error'
        })
      } else this.$router.push({ path: `/user/${this.uid}/purchase` })
    },
    ...mapMutations(['removeFromCart', 'deleteFromCart', 'addToCart'])
  }
}
</script>

<style scoped>
img {
  max-width: 60px;
  height: auto;
}

.cart-image {
  max-width: 50px;
}
</style>
