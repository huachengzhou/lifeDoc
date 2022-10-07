import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '主页',
        component: Home
    },
    {
        path:"/element",
        name :"element ui 简单使用",
        component:() => import("../views/ElementCpn.vue"),
        children:[
            {
                ////以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，
                // 所以子路由上的path不用在重新声明主路由上的path了。
                path:"containerCpn",
                name :"Container 布局容器",
                component:() => import("../views/elementStudy/ContainerCpn.vue"),
            }
        ]
    },
    {
        path: '/about',
        name: '关于我',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/archives',
        name: '档案',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Archives.vue'),
        //重要  组件私有前置守卫
        beforeEnter: (to, from, next) => {
            //必须调用，不调用不会跳转
            next() ;
        }
    },
    {
        path: '/other',
        name: '其他',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Other.vue')
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: 'history',//修改模式为history
    linkActiveClass: 'active' ,
    routes
});

//全局前置守卫 (2.5以前router.beforeResolve 注册后和现在的钩子差不多)
router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.name) {
        document.title = to.name;
    }
    // console.log(from);
    //必须调用，不调用不会跳转
    next();
});

//全局后置钩子 => 和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
router.afterEach((to, from) => {
    console.log(to);
    console.log(from);
});

//vue 路由切换时，重复点击相同路由会报错，解决方案
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default router
