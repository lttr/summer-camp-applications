import Vue from 'vue'
import Router from 'vue-router'

import Application from './views/Application.vue'
import Home from './views/Home.vue'

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
      path: '/t/:event/admin',
      name: 'CampAdmin',
      component: () => import(/* webpackChunkName: "campadmin" */ './views/CampAdmin.vue'),
    },
  ],
})
