export const debounce = function (fn, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(context, args), wait)
  }
}

export const scrollListener = f => () => debounce(f(), 700)

export const LazyImageDirective = {
  inserted: el => {
    function loadImage () {
      const imageElement = Array.from(el.children).find(el => el.nodeName === 'IMG')

      if (imageElement) {
        imageElement.addEventListener('error', () => el.classList.add('err-img'))
        imageElement.src = imageElement.dataset.url
      }
    }

    function handleIntersect (entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return null
        else {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver () {
      const options = {
        // circumstances under which the observer's callback is invoked
        root: null,
        threshold: '0'
      }

      const observer = new IntersectionObserver(handleIntersect, options)

      observer.observe(el) // target element to watch
    }

    if (!window['IntersectionObserver']) {
      loadImage()
    } else {
      createObserver()
    }
  }
}
