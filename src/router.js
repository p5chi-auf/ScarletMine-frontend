import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/Login.vue')
    },
    {
      path: '/logged',
      name: 'logged',
      component: () => import('./views/user/Logged.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/user/Register.vue')

    }

  ]
})

// Router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('user')
//
//   if (authRequired && !loggedIn) {
//     return next('/login')
//   }
//
//   next()
// })
