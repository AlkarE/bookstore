const CompressionPlugin = require('compression-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const path = require('path')

const vlp = [
  new VuetifyLoaderPlugin()
]

const cp = new CompressionPlugin({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  threshold: 10240,
  minRatio: 0.8
})

const plugins = (process.env.NODE_ENV !== 'production') ? vlp : [...vlp, cp]

module.exports = {
  lintOnSave: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins,
      output: {
        filename: 'js/bookstore/[name].js',
        chunkFilename: 'js/bookstore/[name].[chunkhash].js'
      }
    }
  }
}
