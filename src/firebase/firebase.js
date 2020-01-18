import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

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

export class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig)

      this.auth = app.auth()
      this.db = app.database()
    }

    createUserWithEmailAndPassword = (email, password) => {
     return this.auth.createUserWithEmailAndPassword(email, password)
    }

    loginUserWithEmailAndPassword = (email, password) => {
     return this.auth.signInWithEmailAndPassword(email, password)
    }
    logOutUser = () => {
     return this.auth.signOut()
    }

    resetUserEmail = (email) => {
     return this.auth.sendPasswordResetEmail(email)
    }

    updateUserPassword = (password) => {
     return this.auth.currentUser.updatePassword(password)
    }

    user = uid => {
      return this.db.ref(`users/${uid}`)
    }

    users = () => { 
     return this.db.ref('users')
    }
}

export default Firebase

