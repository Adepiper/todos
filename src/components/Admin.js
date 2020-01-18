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

    componentDidMount() {
        this.setState({
            loading: true
        })
      this.props.firebase
            .users()
            .on('value', snapshot => {
            const userObject = snapshot.val()

            const usersList = Object.keys(userObject).map(key => ({
                ...userObject[key],
                    uid: key
            }))
            this.setState({
                users: usersList,
                loading: false
            })
        })
    }

        componentWillUnmount() {
            const {firebase} = this.props
           firebase.users().off()
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
