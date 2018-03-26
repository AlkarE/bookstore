<template>
  <section class="ml-3">
    <v-select
      :items="priceSort"
      v-model="sel"
      label="Сортировать:"
      single-line
    ></v-select>
  </section>
</template>

<script>
export default {
  name: 'SortPanel',
  data: () => ({
    // тут сортировка по цене + нужно по жанрам ?
    priceSort: ['Цена: по убыванию', 'Цена: по возрастанию'],
    sel: ''
  }),
  watch: {
    sel (newVal) {
      if (newVal === this.priceSort[0]) {
        this.$store.commit('priceSort')
      } else {
        this.$store.commit('priceSort', 'payload')
      }
    }
  }
}
</script>
