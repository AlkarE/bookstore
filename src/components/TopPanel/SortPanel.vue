<template>
  <div class="ml-3">
    <v-select
      :items="priceSort"
      v-model="sortBy"
      v-bind='themeColor'
      label="Сортировать:"
      single-line
      append-icon=''
    ></v-select>
  </div>
</template>

<script>
import themeColor from '@/mixins/themeColor'

export default {
  name: 'SortPanel',
  data: () => ({
    // тут сортировка по цене
    priceSort: ['Цена: по убыванию', 'Цена: по возрастанию'],
    sortBy: ''
  }),
  mixins: [themeColor],
  watch: {
    sortBy (newVal) {
      if (newVal === this.priceSort[0]) {
        this.$store.commit('priceSort')
      } else {
        this.$store.commit('priceSort', 'payload')
      }
      this.$store.commit('clearScrollData')
      this.$store.commit('updateScrollData')
    }
  }
}
</script>
