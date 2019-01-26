const CompressionPlugin = require('compression-webpack-plugin')

const cp = new CompressionPlugin({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  threshold: 10240,
  minRatio: 0.8
})

const plugins = (process.env.NODE_ENV === 'production') ? [] : [cp]

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    config.output.filename = 'js/bookstore/bookstore.js'
    config.output.chunkFilename = 'js/bookstore/[name].[chunkhash].js'
    return {
      plugins,
    }
  }
}
