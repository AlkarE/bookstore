const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return {}

    config.output.filename = 'js/bookstore/bookstore.js'
    config.output.chunkFilename = 'js/bookstore/[name].[chunkhash].js'
    return {
      plugins: [
        new CompressionPlugin()
      ],
    }
  }
}
