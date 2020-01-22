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
                    
               // .then(() => this.setState({
                 //   isSent: true
                //}))
        }
        render() {
           
            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                    needsEmailVerifcation(authUser) ? (
                        <div>
                            if (this.state.isSent) {
                                <p>
                                    Email confirmation sent 
                                </p>
                            }  else {
                            <p>
                                Verify your E-mail: Check your Emails
                            </p>
                            }
                            <button disabled= {this.state.isSent} type="button" onClick={this.onSendEmailVerification}>
                                Send confirmation E-mail
                            </button>
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

