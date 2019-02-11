import firebase from 'firebase/app'
import 'firebase/firestore'

let _firebaseApp = null
let _db = null

export async function initializeFirebase() {
  const response = await fetch(process.env.VUE_APP_FIREBASE_CONFIG)
  const json = await response.json()
  _firebaseApp = firebase.initializeApp(json)
  _db = _firebaseApp.firestore()
}

export const firebaseApp = _firebaseApp
export const db = _db
