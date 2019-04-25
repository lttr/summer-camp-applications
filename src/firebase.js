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

export function initializeFirebase() {
  if (process.env.NODE_ENV === 'production') {
    // when vue cli built the project then firebase hosting is expected
    return fetch('/__/firebase/init.json')
      .then(response => response.json())
      .then(config => {
        firebase = firebaseApp.initializeApp(config)
      })
  } else {
    firebase = firebaseApp.initializeApp(firebaseConfigDev)
    return Promise.resolve(firebase)
  }
}

export function initializeDatabase() {
  return firebase.firestore()
}

export function signIn() {
  const provider = new firebaseApp.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
}

export function signOut() {
  firebase.auth().signOut()
}

export function currentUser() {
  return firebase.auth().currentUser
}
