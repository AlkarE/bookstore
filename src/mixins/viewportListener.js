/*
  this.listener = wrap - allow flexbox wrap on xs viewport
  this.listener = column - allow flexbox-direction to column
  this.listener = justify-center - allow flexbox justify-content: center
*/

export default {
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding[this.listener] = true
      return binding
    }
  }
}
