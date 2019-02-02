import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyC1LGOMDGQaFbOqr85L4XGERNi3bD7E7sE',
  authDomain: 'summer-camp-applications.firebaseapp.com',
  databaseURL: 'https://summer-camp-applications.firebaseio.com',
  projectId: 'summer-camp-applications',
  storageBucket: 'summer-camp-applications.appspot.com',
  messagingSenderId: '747153391031',
}
firebase.initializeApp(config)

const featuresElement = document.createElement('div')
try {
  let app = firebase.app()
  let features = ['auth', 'firestore', 'messaging', 'storage'].filter(
    (feature) => typeof app[feature] === 'function'
  )
  const featuresText = `Firebase SDK loaded with ${features.join(', ')}`
  featuresElement.textContent = featuresText
  document.body.appendChild(featuresElement)
} catch (e) {
  console.error(e)
  const featuresError = 'Error loading the Firebase SDK, check the console.'
  featuresElement.textContent = featuresError
}
