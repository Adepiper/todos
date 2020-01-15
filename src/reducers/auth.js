import {
    logOutFailure,
    logOutRequest,
    logOutSuccess,
    loginFailure,
    loginRequest,
    loginSucess,
    verifyRequest,
    verifySuccess,
    requestSignup,
    successSignUp,
    signUpFailure
} from '../actions'



export default (
    state = {
        isLogginIn : false,
        isLogginOut: false,
        isVerifying: false,
        loginError: false,
        logoutError: false,
        isAuthenticated:false,
        verifyingError: false,
        isSigningUp: false,
        signupError: false,
        signUpSuccess: false,
        user: {}
    },
        action 
) => {
    switch (action.type) {
        case loginRequest:
            return {
                ...state,
                isLogginIn: true,
                loginError: false
            }
        case loginSucess : 
            return {
                ...state,
                isLogginIn: false,
                isAuthenticated: true,
                user: action.user
            }
            case loginFailure:
                return{
                    ...state,
                    loginError: true,
                    isAuthenticated: false,
                    isLogginIn: false 
                }
                case logOutRequest : 
                return {
                    ...state, 
                    isLogginOut: true,
                    logoutError: false
                } 
                case logOutSuccess: 
                return {
                    ...state,
                    isLogginOut: false ,
                    isAuthenticated: false,
                    user: {}
                }
                case logOutFailure: 
                return {
                    ...state, 
                    isLogginOut: false,
                    logoutError: true
                }
                case verifyRequest:
                    return{
                        ...state,
                        isVerifying: true,
                        verifyingError: false
                    }
                case verifySuccess: 
                return {
                    ...state,
                    isVerifying: false
                }
                case requestSignup:
                    return {
                        ...state,
                        isSigningUp: true,
                        isAuthenticated: false,
                        isLogginIn: false
                    }
                    case successSignUp: 
                    return {
                        ...state,
                        isSigningUp: false,
                        signUpSuccess: true,
                        isAuthenticated: false,
                        user: action.user
                    }
                case signUpFailure: 
                return {
                    ...state, 
                    isSigningUp: false,
                    signupError: true,
                    isAuthenticated: false
                }
        default:
            return state
           
    }
}



























