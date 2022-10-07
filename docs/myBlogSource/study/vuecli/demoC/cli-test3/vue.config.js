const { defineConfig } = require('@vue/cli-service') ;

const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        // 设置@/的意义
        '@': resolve('src')
      }
    }
  }
});
//error Component name “Home“ should always be multi-word vue/multi-word-component-names  lintOnSave: false
