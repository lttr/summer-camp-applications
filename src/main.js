import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'
import { initializeFirebase } from './firebase'

Vue.config.productionTip = false

Vue.use(VueFire)

async function initializeApp() {
  await initializeFirebase()
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

initializeApp()
