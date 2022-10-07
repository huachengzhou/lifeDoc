import welcomeComponent from './../components/admin_base/welcome.vue';

//路由控制
let snavRouter = [
    {
        path: '/',
        redirect: '/index?pos=0'
    },
    {
        path: '/index',
        component: welcomeComponent
    }
];
export {snavRouter}