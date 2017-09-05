import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCEQQYFPMOGJLACwey-05Infs75x5SPl1c',
  authDomain: 'autospa-c06a0.firebaseapp.com',
  databaseURL: 'https://autospa-c06a0.firebaseio.com',
  storageBucket: 'autospa-c06a0.appspot.com',
  messagingSenderId: '652746269995'
}

firebase.initializeApp(config)
const database = firebase.database()
const auth = firebase.auth()

export default database
export { auth }
