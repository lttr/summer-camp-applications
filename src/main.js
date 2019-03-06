import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueFire)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
