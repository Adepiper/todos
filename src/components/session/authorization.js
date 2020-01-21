import React from 'react'
import * as ROUTES from '../Routes' 
import { compose } from 'recompose'
import { withFirebase } from '../../firebase'
import {withRouter} from 'react-router-dom'
import AuthUserContext from './context'

const withAuthorization = (condition) => Component => {
 class authorization extends React.Component {

    componentDidMount() {
        const {firebase, history} = this.props
        this.listener = firebase.onAuthListener(
            authUser => {
                if (!condition(authUser)){
                    history.push(ROUTES.login)
                }
            },
            () => history.push(ROUTES.login) 
        )
    }
    
    render() {
        return (
            <AuthUserContext.Consumer>
             { authUser => condition(authUser) ? <Component {...this.props} /> : null}
            </AuthUserContext.Consumer>
        )
    }
}
        return compose(withFirebase,withRouter)(authorization)
}

export default withAuthorization
