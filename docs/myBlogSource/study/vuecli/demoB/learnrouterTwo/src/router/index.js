import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

//vue 路由切换时，重复点击相同路由会报错，解决方案
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homex'//缺省时候重定向到/home
    },
    {
      path: '/homex',
      name: '主页',
      component: () => import("../views/homex/Home.vue")
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      component: () => import ('../views/home/Home.vue')
    },
    {
      path: '/categories',
      component: () => import ('../views/categories/Categories.vue')
    },
    {
      path: '/shop',
      component: () => import ('../views/shop/Shop.vue')
    },
    {
      path: '/profile',
      component: () => import ('../views/profile/Profile.vue')
    }
  ]
})
