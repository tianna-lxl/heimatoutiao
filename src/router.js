import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
import Main from './views/home/main.vue'
import notFound from './views/404.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: notFound
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home' // 重定向
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '',
        component: Main
      }, {
        // path : '/home/comment'
        path: 'comment',
        component: () => import('./views/comment/index.vue')
      }, {
        path: 'material',
        component: () => import('./views/material/index.vue')
      }, {
        path: 'articles',
        component: () => import('./views/articles/index.vue')
      }, {
        path: 'publish',
        component: () => import('./views/publish/index.vue')
      }, {
        path: 'publish/:articleId',
        component: () => import('./views/publish')
      }, {
        path: 'account',
        component: () => import('./views/account/index.vue')
      }, {
        path: 'fansdata',
        component: () => import('./views/fans/fansdata.vue')
      }]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
