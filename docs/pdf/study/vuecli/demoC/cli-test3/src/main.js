import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import instance from "./axios";//导入
import CpnHomeMenu from '@/components/CpnHomeMenu.vue';

import './components/common/index' // 自动注册全局项目组件

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //单独引入样式文件
Vue.use(ElementUI);

Vue.config.productionTip = false

const app = new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app');

Vue.component('cpn-menu', CpnHomeMenu); //注册Nav组件为全局组件


Vue.config.silent = true ;//去掉 vue warn


