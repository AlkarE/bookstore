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
              <v-icon @click='removeFromCart(book.book.Bookname)' class="cur">remove</v-icon>
              <small v-if="book.quantity > 0">&nbsp;x{{book.quantity}}</small>
              <v-icon @click='addToCart(book.book.Bookname)' class="cur">add</v-icon>
              <v-icon @click='deleteFromCart(book.book.Bookname)' class="cur">delete_forever</v-icon>
            </v-list-tile>
          </template>
          <v-divider></v-divider>
          <div class="pt-2 text-xs-center">
            <!-- <span class="cur" @click="goPurchase">Оформить заказ</span> -->
            <span class="cur" @click='goPurchase'>Оформить заказ</span>
          </div>
        </v-list>
        <div class="text-xs-center" v-else>
          <span class="my-3">Тут ничего нет!</span>
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
