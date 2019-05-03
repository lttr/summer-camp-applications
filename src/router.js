import Vue from 'vue'
import Router from 'vue-router'

import Application from './views/Application.vue'
import SignIn from './views/SignIn.vue'
import CampAdmin from './views/CampAdmin.vue'
import Confirmation from './views/Confirmation.vue'
import Home from './views/Home.vue'
import OrgAdmin from './views/OrgAdmin.vue'
import PageNotFound from './views/PageNotFound.vue'
import { firebase } from './firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/admin',
      name: 'OrgAdmin',
      component: OrgAdmin,
    },
    {
      path: '/t/:event/prihlaska',
      name: 'Application',
      component: Application,
    },
    {
      path: '/t/:event/prihlaska-odeslana',
      name: 'Confirmation',
      component: Confirmation,
    },
    {
      path: '/t/:event/admin',
      name: 'CampAdmin',
      component: CampAdmin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !user) {
      next({ path: '/sign-in', query: { redirect: to.fullPath } })
    } else if (requiresAuth && user) {
      next()
    } else {
      next()
    }
  })
})

export default router
