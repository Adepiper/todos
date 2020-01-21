import React, { Component } from 'react'
import { withFirebase } from '../firebase'
import {compose} from 'recompose'
import * as ROLES from './roles'
import { withAuthorization } from './session'


export class Admin extends Component {

    
    state = {
        loading: false,
        users: []
    }

    

    componentDidMount =() => {

        const {firebase} = this.props
        
            this.setState({
                loading: true
            })
               firebase.users().on('value', snapshot => {
                const userObject = snapshot.val()

                const userList = Object.keys(userObject).map(key => ({
                    ...userObject[key],
                    uid: key
                }))
                this.setState({
                    users: userList,
                    loading: false
                })
            })
            
    }
    
    componentWillUnmount () {
        this.props.firebase.users().off()
    }
    
    

    render() {
        const {loading, users} = this.state
        return (
            <div>
            <h1>Admin</h1>
                {loading && <div>loading</div>}
                <UserList users= {users}/>
            </div>
        )
    }
}


const UserList = ({users}) => {
   return(
       <ul>
           {users.map(user => (
               <li key = {user.uid}>
                    <span>
                        ID: {user.uid}
                    </span>
                    <span>
                        Email: {user.email}
                    </span>
               </li>
           ))}
       </ul>
   )
}

const condition = authUser => {
    return authUser && !!authUser.roles[ROLES.ADMIN]
}
 
export default compose(withAuthorization(condition) ,withFirebase)(Admin)
