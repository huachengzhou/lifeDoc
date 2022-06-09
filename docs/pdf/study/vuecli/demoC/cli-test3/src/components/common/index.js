import Vue from 'vue'
// require.context 是webpack的一个api
const req = require.context('./', true, /\.vue$/)
// 全局注册
req.keys().forEach((element,index) => {
  let name = element.replace(/(\.\/)|(\.vue)/ig, '')
  Vue.component(`${name.split('/')[name.split('/').length - 1]}`, req(element).default)
})
