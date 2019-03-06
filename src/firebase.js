import firebaseApp from 'firebase/app'
import 'firebase/firestore'

const firebaseConfigDev = {
  apiKey: 'AIzaSyC1LGOMDGQaFbOqr85L4XGERNi3bD7E7sE',
  authDomain: 'summer-camp-applications.firebaseapp.com',
  databaseURL: 'https://summer-camp-applications.firebaseio.com',
  projectId: 'summer-camp-applications',
  storageBucket: 'summer-camp-applications.appspot.com',
  messagingSenderId: '747153391031',
}

export function initializeFirebase() {
  if (process.env.NODE_ENV === 'production') {
    // when vue cli built the project then firebase hosting is expected
    return fetch('/__/firebase/init.json').then((response) => {
      return firebaseApp.initializeApp(response.json())
    })
  } else {
    const firebase = firebaseApp.initializeApp(firebaseConfigDev)
    return Promise.resolve(firebase)
  }
}

export async function initializeDatabase() {
  const firebase = await initializeFirebase()
  return firebase.firestore()
}
