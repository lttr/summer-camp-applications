import Vue from 'vue'
import Router from 'vue-router'

import Application from './views/Application.vue'
import SignIn from './views/SignIn.vue'
import CampAdmin from './views/CampAdmin.vue'
import CampParameters from './views/CampParameters.vue'
import Confirmation from './views/Confirmation.vue'
import Home from './views/Home.vue'
import OrgAdmin from './views/OrgAdmin.vue'
import PageNotFound from './views/PageNotFound.vue'
import { db, auth } from './firebase'
import { authState } from './auth'

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
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
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
      path: '/t/:event/parameters',
      name: 'CampParameters',
      component: CampParameters,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/t/:event/admin',
      name: 'CampAdmin',
      component: CampAdmin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
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
  function goToSignInPage() {
    next({ name: 'SignIn', query: { redirect: to.fullPath } })
  }

  auth.onAuthStateChanged(function (user) {
    if (user) {
      authState.signedIn = true
      authState.signedInUser = user
      db.collection('admins')
        .get()
        .then((qs) => {
          if (qs.docs.find((x) => x.id === user.uid)) {
            authState.isAdmin = true
          }
        })
    }

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth && !user) {
      goToSignInPage()
    } else if (requiresAuth && user) {
      next()
    } else {
      next()
    }
  })
})

export default router
