import firebase from 'firebase/app'

let _firebaseApp = null
let _db = null

export async function initializeFirebase() {
  const response = await fetch('/__/firebase/init.json')
  _firebaseApp = firebase.initializeApp(response.json())
  _db = _firebaseApp.firestore()
}

export const firebaseApp = _firebaseApp
export const db = _db
