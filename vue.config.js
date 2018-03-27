const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')

module.exports = {
  lintOnSave: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins: [
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8
        })
      ],
      output: {
        path: path.join(__dirname, '/cool-build'),
        filename: 'js/bookstore/[name].js'
      }
    }
  }
}
