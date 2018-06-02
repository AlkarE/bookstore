<template>
  <div class="ml-3">
    <v-select
      :items="priceSort"
      v-model="sortBy"
      label="Сортировать:"
      single-line
      append-icon=''
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'SortPanel',
  data: () => ({
    // тут сортировка по цене
    priceSort: ['Цена: по убыванию', 'Цена: по возрастанию'],
    sortBy: ''
  }),
  watch: {
    async sortBy (newVal) {
      if (newVal === this.priceSort[0]) {
        this.$store.commit('priceSort')
      } else {
        this.$store.commit('priceSort', 'payload')
      }
      await this.$store.commit('clearScrollData')
      await this.$store.commit('updateScrollData')
    }
  }
}
</script>
