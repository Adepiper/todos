import React from 'react'

import AuthUserContext from './context'
import {withFirebase} from '../../firebase'

const EmailVerification = Component => {

    class withEmailVerification extends React.Component {
        state = {
            isSent: false
        }
        onSendEmailVerification = () => {
            const {firebase} = this.props
            firebase.doEmailVerification()
        }
        render() {
           
            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                    needsEmailVerifcation(authUser) ? (
                        <div className="Home">
                        <div className="overlay">
                        <div className="container">
                            <div className="jumbotron text-center mx-4">
    
                        
                               <h5 className="my-2">
                                Email confirmation sent 
                                </h5>
                            <h5 className="my-2">
                                Verify your E-mail: Check your Email
                            </h5>
                            <button className="btn" type="button" onClick={this.onSendEmailVerification}>
                                Re-send confirmation E-mail
                            </button>
                            </div>
                        </div>
                        </div>
                            </div>
    
                    )
                       : (<Component {...this.props} />)
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return withFirebase(withEmailVerification)
} 

    const needsEmailVerifcation = authUser => authUser && !authUser.emailVerified 
                                                && authUser.providerData
                                                    .map(provider => provider.providerId)
                                                    .includes('password');

export default EmailVerification

