import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

export let db = null
export let functions = null
export let auth = null

export async function initializeFirebase() {
  const firebaseInstance = await initializeFirebaseConfig()
  db = initializeDatabase(firebaseInstance)
  if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', 5503)
  }
  functions = initializeFunctions(firebaseInstance)
  auth = initializeAuth(firebaseInstance)
}

async function initializeFirebaseConfig() {
  const url = '/__/firebase/init.json'
  const response = await fetch(url)
  const config = await response.json()
  return firebaseApp.initializeApp(config)
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

export function signOut() {
  auth.signOut()
}

export function currentUser() {
  return auth.currentUser
}
