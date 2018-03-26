<template>
  <v-btn icon alt="Добавить в корзину" title="Добавить в корзину" @click='addToCart(item)'>
    <v-icon>add_shopping_cart</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'BuyBtn',
  props: {
    item: String,
    required: true
  },
  methods: {
    ...mapMutations(['addToCart'])
  }
}
</script>
