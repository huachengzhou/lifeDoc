import Vue from 'vue'
import App from './App'
import ROUTER from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:ROUTER,
  render: h => h(App)
});
