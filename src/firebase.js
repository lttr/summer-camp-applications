import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import Vue from 'vue'
import router from './router'

export let db = null
export let functions = null
export let auth = null

export async function initializeFirebase() {
  const firebaseInstance = await initializeFirebaseConfig()
  db = initializeDatabase(firebaseInstance)
  Vue.prototype.$db = db
  functions = initializeFunctions(firebaseInstance)
  auth = initializeAuth(firebaseInstance)
  if (window.location.hostname === 'localhost') {
    // Authentication emulator is not yet available
    // https://firebase.google.com/docs/emulator-suite/install_and_configure
    // auth.useEmulator('http://localhost:5501')
    functions.useEmulator('localhost', 5502)
    db.useEmulator('localhost', 5503)
  }
}

async function initializeFirebaseConfig() {
  const url = '/__/firebase/init.json'
  const response = await fetch(url)
  const firebaseConfig = await response.json()
  return firebaseApp.initializeApp(firebaseConfig)
}

function initializeDatabase(firebase) {
  return firebase.firestore()
}

function initializeFunctions(firebase) {
  return firebase.functions()
}

function initializeAuth(firebase) {
  return firebase.auth()
}

export async function signInWithFirebase() {
  const provider = new firebaseApp.auth.GoogleAuthProvider()
  const result = await auth.signInWithPopup(provider)
  return result
}

export async function signOut() {
  auth.signOut()
  router.push({ name: 'SignIn' })
}

export function currentUser() {
  return auth.currentUser
}
