require("../../html/index.html");
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//使用router
Vue.use(VueRouter);
//使用resource
Vue.use(VueResource);
//使用ElementUI
Vue.use(ElementUI);
//引入router配置
import {snavRouter} from './../router/router';
//实例化router
const router = new VueRouter({
    routes: snavRouter
});
/**
 * @description 启动App
 * @returns {{name: string}}
 * @constructor
 */
    //App启动
let App = new Vue({
        el: '#App',
        data(){
            return {
                'name': 'index'
            }
        },
        router: router,
        mounted(){
        },
    });
