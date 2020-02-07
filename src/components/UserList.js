import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { withFirebase } from '../firebase'
import * as ROUTES from  './Routes'

export class UserList extends Component {

    
    state = {
        loading: false,
        users: []
    }

    

    componentDidMount =() => {

        const {firebase} = this.props
        
            this.setState({
                loading: true
            })
               firebase.users(
               ).on('value', snapshot => {
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
        this.props.firebase.users(
        ).off()
    }
    
    

    render() {
        const {loading, users} = this.state
        return (
            <div>
            <h1>Admin</h1>
                {loading && <div>loading</div>}
                <ul>
                    {users.map(user => (
               <li key = {user.uid}>
                    <span>
                        ID: {user.uid}
                    </span>
                    <span>
                        Email: {user.email}
                    </span>

                    <span>
                        <Link to = {{
                            pathname: `${ROUTES.Admin}/${user.uid}`,
                            state: {users}
                        }}>
                            Details
                        </Link>
                    </span>
               </li>
           ))}
       </ul>
   )
            </div>
        )
    }
    }


export default withFirebase(UserList)
