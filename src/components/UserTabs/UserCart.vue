<template>
  <div>
    <v-list v-if="inCart">
      <template v-for="(book,i) in cart">
        <v-list-tile :key='i' v-if="book.quantity > 0">
          <span>{{book.book.Bookname}}</span>
          <v-spacer></v-spacer>
          <v-icon @click='removeFromCart(book.book.Bookname)' class="cur">remove</v-icon>
          <small v-if="book.quantity > 0">&nbsp;x{{book.quantity}}</small>
          <v-icon @click='addToCart(book.book.Bookname)' class="cur">add</v-icon>
          <v-icon @click='deleteFromCart(book.book.Bookname)' class="cur">delete_forever</v-icon>
          <span>{{book.book.price}} руб.</span>
        </v-list-tile>
      </template>
      <v-layout justify-center>
        <span>Выбрано книг на сумму {{allPrice}} руб.</span>
        <v-spacer></v-spacer>
        <v-btn @click='goPurchase'>Оформить заказ</v-btn>
      </v-layout>
    </v-list>
    <div class="text-xs-center" v-else>
      <span class="my-3">Тут ничего нет!</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserCart',
  computed: {
    ...mapGetters(['inCart', 'cart', 'uid', 'allPrice'])
  },
  methods: {
    goPurchase () {
      this.$router.push(`/user/${this.uid}/purchase`)
    },
    ...mapMutations(['removeFromCart', 'addToCart', 'deleteFromCart'])
  }
}
</script>
