<template>
  <component :is="c"></component>
</template>

<script>
import UserCart from '@/components/UserTabs/UserCart'
import UserSettings from '@/components/UserTabs/UserSettings'
import UserBookmarks from '@/components/UserTabs/UserBookmarks'

export default {
  name: 'UserTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    tab: {
      type: String,
      default: 'user-cart',
      required: true
    }
  },
  components: {
    'user-cart': UserCart,
    'user-settings': UserSettings,
    'user-bookmarks': UserBookmarks
  },
  computed: {
    c () {
      const t = parseInt(this.tab)
      if (t === 0) {
        return 'user-cart'
      } else if (t === 1) {
        return 'user-settings'
      } else return 'user-bookmarks'
    }
  }
}
</script>
