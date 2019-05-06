import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfigDev = {
  apiKey: 'AIzaSyC1LGOMDGQaFbOqr85L4XGERNi3bD7E7sE',
  authDomain: 'summer-camp-applications.firebaseapp.com',
  databaseURL: 'https://summer-camp-applications.firebaseio.com',
  projectId: 'summer-camp-applications',
  storageBucket: 'summer-camp-applications.appspot.com',
  messagingSenderId: '747153391031',
}

export let db = null
export let functions = null
export let auth = null

export async function initializeFirebase() {
  const firebaseInstance = await initializeFirebaseConfig()
  db = initializeDatabase(firebaseInstance)
  functions = initializeFunctions(firebaseInstance)
  auth = initializeAuth(firebaseInstance)
}

async function initializeFirebaseConfig() {
  if (process.env.NODE_ENV === 'production') {
    // when vue cli built the project then firebase hosting is expected
    const response = await fetch('/__/firebase/init.json')
    const config = await response.json()
    return firebaseApp.initializeApp(config)
  } else {
    return firebaseApp.initializeApp(firebaseConfigDev)
  }
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
