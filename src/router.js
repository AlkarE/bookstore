import Vue from 'vue'
import Router from 'vue-router'
import ShowCase from './views/ShowCase'
const ProductPage = () => import('./views/ProductPage/ProductPage.vue')
const UserProfile = () => import('./views/User/UserProfile.vue')
const PurchasePage = () => import('./views/PurchasePage/PurchasePage.vue')
const Error404 = () => import('./views/Error404.vue')

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
      component: ProductPage,
      beforeEnter (to, from, next) {
        if (/^\d+$/.test(to.params.id)) {
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
      component: UserProfile,
      beforeEnter (to, from, next) {
        if (/^\d+$/.test(to.params.id)) {
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
      path: '/user/:id/purchase',
      name: 'PurchasePage',
      component: PurchasePage
    },
    {
      path: '/404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
