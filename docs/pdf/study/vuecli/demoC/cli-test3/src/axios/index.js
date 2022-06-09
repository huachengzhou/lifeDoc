import axios from 'axios'
import store from '@/store/index' //引入store
import router from '@/router' //引入router
import Vue from 'vue';
//第一步创建实例
//全局axios默认值
//1.可以使用axios.defaulys的方式  2.可以使用axios.create()的方式,以下使用方式2
//方式1
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log("axios请求") ;
  console.log(config) ;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 给Vue函数添加一个原型属性$axios指向axios（全局使用axios）
// vue实例中直接用this.$axios就可以执行axios方法
Vue.prototype.$axios=axios ;

