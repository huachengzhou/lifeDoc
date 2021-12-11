import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld' ;
import about from '@/components/about' ;
import other from '@/components/other' ;

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/about",
      name:"about" ,
      component:about
    },
    {
      path:"/other",
      name:"other" ,
      component:other
    }
  ]
})
