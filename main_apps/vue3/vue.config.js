const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'vue3',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 3000,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    output: {
      jsonpFunction: `webpackJsonp-base-vue3`,
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@micro-zoe/micro-app", path.join(__dirname, '../../../micro-app/lib/index.esm.js'))

    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          options.compilerOptions = {
            ...(options.compilerOptions || {}),
            isCustomElement: (tag) => /^micro-app/.test(tag),
          };
          return options
        })
  },
}