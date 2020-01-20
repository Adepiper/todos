import React, { Component } from 'react'
import { withFirebase } from '../firebase'


export class Admin extends Component {

    constructor (props){
    super(props)
    
    this.state = {
        loading: false,
        users: []
    }
}

    componentDidMount =() => {
        const users = []
        
            this.setState({
                loading: true
            })
               this.props.firebase.users().forEach( snapshot => {
                const {email} = snapshot.data()
                    users.push({
                        key: snapshot.id,
                        email
                    })
                this.setState({
                    users: users,
                    loading: false
                })
            })
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

export default withFirebase(Admin)
