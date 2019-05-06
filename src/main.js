import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import { initializeFirebase, initializeDatabase } from './firebase'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

async function initializeApp() {
  await initializeFirebase()
  initializeDatabase()
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

initializeApp()
