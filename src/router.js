import Vue from 'vue'
import Router from 'vue-router'
import ShowCase from './views/ShowCase'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/project/bookstore/',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'ShowCase',
      component: ShowCase
    },
    {
      path: '/book/:id',
      name: 'ProductPage',
      component: () => import('./views/ProductPage/ProductPage.vue'),
      beforeEnter (to, from, next) {
        if (/^\d+$/.test(Number(to.params.id))) {
          next()
        } else {
          next({
            path: '/404',
            query: { redirect: to.fullPath }
          })
        }
      }
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: () => import('./views/User/UserProfile.vue')
    },
    {
      path: '/user/:id/purchase',
      name: 'PurchasePage',
      component: import('./views/PurchasePage/PurchasePage.vue')
    },
    {
      path: '/404',
      component: import('./views/Error404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
