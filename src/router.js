import Vue from 'vue'
import Router from 'vue-router'

import Application from './views/Application.vue'
import Confirmation from './views/Confirmation.vue'
import Home from './views/Home.vue'
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
      component: () => import(/* webpackChunkName: "orgadmin" */ './views/OrgAdmin.vue'),
    },
    {
      path: '/t/:event/prihlaska',
      name: 'Application',
      component: Application,
    },
    {
      path: '/t/:event/potvrzeni',
      name: 'Confirmation',
      component: Confirmation,
    },
    {
      path: '/t/:event/admin',
      name: 'CampAdmin',
      component: () => import(/* webpackChunkName: "campadmin" */ './views/CampAdmin.vue'),
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
})
