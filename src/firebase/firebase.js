import myFirebase from './firebaseConfig'
import React, {Component} from 'react'
  
export class Firebase extends Component {
    
     

      auth = myFirebase.auth()
      db = myFirebase.firestore()
    

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

    user = (uid) => {
      
     return  this.db.collection('users').doc(uid)
    }

    users = () => {
     return this.db.collection('users')
    }

    addTodo = () => {
      return this.db.collection('Todos')
    }
}



export default Firebase

