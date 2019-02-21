import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

const firebaseConfigProd = {
  apiKey: 'AIzaSyC76MEiRAAls5SPTHGOk_vq4rMA_5kkjRQ',
  authDomain: 'prihlasky-na-tabor.firebaseapp.com',
  databaseURL: 'https://prihlasky-na-tabor.firebaseio.com',
  projectId: 'prihlasky-na-tabor',
  storageBucket: 'prihlasky-na-tabor.appspot.com',
  messagingSenderId: '556864554700',
}

const firebaseConfigDev = {
  apiKey: 'AIzaSyC1LGOMDGQaFbOqr85L4XGERNi3bD7E7sE',
  authDomain: 'summer-camp-applications.firebaseapp.com',
  databaseURL: 'https://summer-camp-applications.firebaseio.com',
  projectId: 'summer-camp-applications',
  storageBucket: 'summer-camp-applications.appspot.com',
  messagingSenderId: '747153391031',
}

export const firebaseApp = firebase.initializeApp(
  process.env.NODE_ENV === 'production' ? firebaseConfigProd : firebaseConfigDev
)

export const db = firebaseApp.firestore()

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
