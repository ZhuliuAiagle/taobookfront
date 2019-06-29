import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue')
    },
    {
      path:"/index",
      redirect:"/index/frontpage",
      name:'index',
      component: () => import('./views/Index.vue'),
      children:[
        {path:"log", component: () => import('./views/login/Login.vue')},
        {path:"frontpage", component: () => import('./views/frontPage/frontPage.vue')},
        {path:"newitem", component: () => import('./views/MyItem/NewItem.vue')},
        {path:"search", component: () => import('./views/Search/Search.vue')},
        {path:"request", component: () => import('./views/request/Request.vue')}
      ]
    }
  ]
})
