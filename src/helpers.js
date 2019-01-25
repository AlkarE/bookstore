export const debounce = function (fn, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(context, args), wait)
  }
}

export const scrollListener = f => () => debounce(f(), 700)
