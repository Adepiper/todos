import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_Api_Key,
    authDomain: process.env.REACT_APP_Auth_Domain,
    databaseURL: process.env.REACT_APP_Database_URL,
    projectId: process.env.REACT_APP_Project_Id,
    storageBucket: process.env.REACT_APP_Storage_Bucket,
    messagingSenderId: process.env.REACT_APP_Messaging_Sender_Id,
    appId: process.env.REACT_APP_App_Id,
    measurementId: process.env.REACT_APP_Measurement_Id
  };

  const myFirebase= firebase.initializeApp(firebaseConfig)

  export default myFirebase
