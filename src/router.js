import Vue from 'vue'
import Router from 'vue-router'

import Application from './views/Application.vue'
import CampAdmin from './views/CampAdmin.vue'
import Confirmation from './views/Confirmation.vue'
import Home from './views/Home.vue'
import OrgAdmin from './views/OrgAdmin.vue'
import PageNotFound from './views/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
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
