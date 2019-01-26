export default {
  computed: {
    themeColor () {
      const binding = {}
      if (this.$store.getters.themeMode === 'theme--dark') {
        binding.dark = true
        binding.light = false
      } else {
        binding.dark = false
        binding.light = true
      }
      return binding
    }
  }
}
