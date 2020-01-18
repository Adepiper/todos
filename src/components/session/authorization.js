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
        this.listener = firebase.auth
            .onAuthStateChanged(authUser => {
                if(!condition(authUser)){
                    history.push(ROUTES.login)
                }
            })
    }
    componentWillUnmount() {
        this.listener()
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
