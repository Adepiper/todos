import {myFirebase} from '../firebase/firebase'

        const requestLogin = () => {
            return {
                type: loginRequest
            }
        }

        const successLogin = (user) => {
            return {
                type: loginSucess,
                user
            }
        }

        const failedLogin = () => {
            return {
                type : loginFailure,
                
            }
        }

        const requestLogout = () => {
            return {
                type: logOutRequest
            }
        }

        const successLogout = () => {
            return {
                type: logOutSuccess,
                
            }
        }

        const failedLogOut = () => {
            return {
                type : logOutFailure,
                
            }
        }

        const requestVerify = () => {
            return {
                type: verifyRequest
            }
        }

        const successVerify = (user) => {
            return {
                type: verifySuccess,
                user
            }
        }

       const signUpRequest = () => {
           return {
               type: requestSignup
           }
       }

       const signUpSucess = (user) => {
           return {
               type: successSignUp,
               user 
           }
       }

       const signUpError = () => {
           return {
               type: signUpFailure
           }
       }

        export const    loginRequest = 'LOGIN_REQUEST',
                        loginSucess = 'LOGIN_SUCCESS',
                        loginFailure = 'LOGIN_FAILURE',
                        logOutRequest = 'LOGOUT_REQUEST',
                        logOutSuccess = 'LOGOUT_SUCCESS',
                        logOutFailure = 'LOGOUT_FAILURE',
                        verifyRequest = 'VERIFY_REQUEST',
                        verifySuccess = 'VERIFY_SUCCESS',
                        requestSignup = 'SIGNUP_REQUEST',
                        successSignUp = 'SIGNUP_SUCCESS',
                        signUpFailure = 'SIGNUP_FAILURE',
                        emailConfirm = 'EMAIL_CONFIRM'



        export const loginUser = (email, password) => dispatch => {
                            dispatch(requestLogin())
                            myFirebase
                                .auth()
                                .signInWithEmailAndPassword(email, password)
                                .then(user => {
                                    dispatch(successLogin(user))
                                }).catch(error => {
                                    dispatch(failedLogin())
                                })
        }

        export const logoutUser = () => dispatch => {
            dispatch(requestLogout())
            myFirebase
                .auth()
                .signOut()
                .then(() => {
                    dispatch(successLogout())
                }).catch(error => {
                    dispatch(failedLogOut())
                })
                
        }

        export const verifyUser = () => dispatch => {
            dispatch(requestVerify())
                myFirebase
                    .auth()
                        .onAuthStateChanged(user => {
                            if (user !== null){
                                dispatch(successLogin(user))
                            }
                            dispatch(successVerify())
                        })
        }

        export const createUser = (email, password) => dispatch => {
            signUpRequest()
                myFirebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                        .then(user => {
                            dispatch(signUpSucess(user))
                        })
                        .then(() => {
                            sendConfirmMail()
                        })
                        .catch(error => {
                            dispatch(signUpError())
                        })
        }
         const sendConfirmMail = () => {
            myFirebase
                .auth()
                    .currentUser
                    .sendEmailVerification({
                        url: 'http://localhost:3000'
                    })
                        
        }
