'use strict'
const path = require('path')

const resolve = dir => path.join(__dirname, dir)
const isProduction = () => process.env.NODE_ENV === 'production'

console.log('isProduction', isProduction())
console.log('=====================================================\n')

module.exports = {
  publicPath: isProduction() ? '/vue-admin-starter' : '/',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      tinymce: 'tinymce'
    }
  },
  chainWebpack(config) {
    config.when(isProduction(), config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          elementUI: {
            name: 'chunk-elementUI',
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
            priority: 60
          },
          vendor: {
            name: 'chunk-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 50,
            chunks: 'initial'
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'),
            priority: 30,
            minChunks: 3,
            reuseExistingChunk: true
          }
        }
      })

      config.optimization.runtimeChunk('single')
    })
  }
}
