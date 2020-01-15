import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAegWYsatoMNXPzLHcoY2_Kdjy6L-tuZXE",
    authDomain: "todos-1a656.firebaseapp.com",
    databaseURL: "https://todos-1a656.firebaseio.com",
    projectId: "todos-1a656",
    storageBucket: "todos-1a656.appspot.com",
    messagingSenderId: "1071388722708",
    appId: "1:1071388722708:web:bb476e11756313b9e28901",
    measurementId: "G-5ZTXYBEKH9"
  };



  export const myFirebase = firebase.initializeApp(firebaseConfig)
  const baseDb = myFirebase.firestore()
  export const db = baseDb