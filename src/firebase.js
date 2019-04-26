import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfigDev = {
  apiKey: 'AIzaSyC1LGOMDGQaFbOqr85L4XGERNi3bD7E7sE',
  authDomain: 'summer-camp-applications.firebaseapp.com',
  databaseURL: 'https://summer-camp-applications.firebaseio.com',
  projectId: 'summer-camp-applications',
  storageBucket: 'summer-camp-applications.appspot.com',
  messagingSenderId: '747153391031',
}

let firebase = null

export async function initializeFirebase() {
  if (process.env.NODE_ENV === 'production') {
    // when vue cli built the project then firebase hosting is expected
    const response = await fetch('/__/firebase/init.json')
    const config = await response.json()
    firebase = firebaseApp.initializeApp(config)
  } else {
    firebase = firebaseApp.initializeApp(firebaseConfigDev)
  }
}

export function initializeDatabase() {
  return firebase.firestore()
}

export async function signInWithFirebase() {
  const provider = new firebaseApp.auth.GoogleAuthProvider()
  const result = await firebase.auth().signInWithPopup(provider)
  return result
}

export function signOut() {
  firebase.auth().signOut()
}

export function currentUser() {
  return firebase.auth().currentUser
}
