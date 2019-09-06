export default {
  functional: true,
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      required: true,
      tye: String,
      default: '_'
    }
  },
  render (h, { props }) {
    let imgErrFlag = false

    const img = h(
      'img',
      {
        class: imgErrFlag ? 'err-img' : null,
        'attrs': {
          'class': 'lazy-img',
          'data-url': props.src,
          'alt': props.alt
        },
        nativeOn: {
          error: imgErrFlag = true
        }
      }
    )
    return h(
      'figure',
      {
        directives: [{
          name: 'lazyload'
        }]
      },
      [img]
    )
  }
}
