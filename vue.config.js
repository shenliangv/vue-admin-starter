const isProduction = () => process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction() ? '/vue-admin-starter' : '/',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      tinymce: 'tinymce'
    }
  }
}
