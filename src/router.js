import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:"/index",
      redirect:"/index/frontpage",
      name:'index',
      component: () => import('./views/Index.vue'),
      children:[
        {path:"log", component: () => import('./views/login/Login.vue')},
        {path:"frontpage", component: () => import('./views/frontPage/frontPage.vue')}
      ]
    }
  ]
})
