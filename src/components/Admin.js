import React from 'react'
import {Switch,  Route} from 'react-router-dom'
import {compose} from 'recompose'
import * as ROLES from './roles'
import { withAuthorization, EmailVerifcation } from './session'
import * as ROUTES from './Routes'
import UserList from './UserList'
import UserItem from './UserItem'

const Admin = () => (
        <div>
            <h1>
                Admin
            </h1>
            <p>
                this is only accessible bt admins
            </p>

            <Switch>
                <Route exact path= {ROUTES.ADMIN_DETAILS} component = {UserItem} />
                <Route exact path= {ROUTES.Admin} component = {UserList} />
            </Switch>
        </div>
    )



    const condition = authUser => {
    return authUser && !!authUser.roles[ROLES.ADMIN]
}
 
export default compose(withAuthorization(condition), EmailVerifcation)(Admin)
