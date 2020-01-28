import myFirebase from './firebaseConfig'
import {Component} from 'react'
  
export class Firebase extends Component {
    
     

      auth = myFirebase.auth()
      db = myFirebase.database()
    

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
      
     return  this.db.ref(`users/${uid}`)
    }

    users = () => {
     return this.db.ref('users')
    }
    onAuthListener = (next, fallback) => {
      this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.user(authUser.uid)
              .once('value')
                .then(snapshot => {
                  const dbUser = snapshot.val()

                  if (!dbUser.roles) {
                    dbUser.roles = {}
                }
                authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    providerData: authUser.providerData,
                    ...dbUser
                }
                next (authUser)
                })
        } else {
          fallback()
        }
      })
    }

    doEmailVerification = () => {
      this.auth.currentUser.sendEmailVerification({
        url: 'http://localhost:3000/todos'
      })
    }
}



export default Firebase

