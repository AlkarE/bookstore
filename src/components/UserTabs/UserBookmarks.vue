<template>
  <div class="mt-2 ml-2">
    <section v-if="this.$store.getters.bookmarks.length > 0">
      <div v-for="book in this.$store.getters.bookmarks" :key='book.id' >
        <router-link :to='`/book/${book.id}`' tag='p' class="link_hover" title="Подробнее">
          <v-layout justify-space-around>
            <span>{{book.Bookname}}</span>
            <v-spacer></v-spacer>
            <span>{{book.price}} руб.</span>
          </v-layout>
        </router-link>
      </div>
    </section>
    <section class='text-xs-center' v-else>
      <strong>Закладок нет!</strong>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.link_hover
  &:hover
    color red
    cursor pointer
</style>
