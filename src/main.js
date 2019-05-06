import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initializeFirebase } from './firebase'

Vue.config.productionTip = false

async function initializeApp() {
  await initializeFirebase()
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

initializeApp()
