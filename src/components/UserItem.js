import React, { Component } from 'react'
import { withFirebase } from '../firebase'

export class UserItem extends Component {


    state = {
        loading: false,
        users: null,
        ...this.props.location.state
    }


   componentDidMount =() => {
        const {firebase, match} = this.props
        if (this.state.users) {
            return;
        }
            this.setState({
                loading: true
            })
               firebase.users(
                   match.params.id
               ).on('value', snapshot => {
                this.setState({
                    users: snapshot.val(),
                    loading: false
                })
            })
    }
    
    componentWillUnmount () {
        this.props.firebase.users(
            this.props.match.params.id
        ).off()
    }
    
    
    render() {
            const {users, loading} = this.state
            const {match} = this.props
        return(
            <div>
                <h2>
                    User ({
                        match.params.id
                    })
                </h2>
                {loading && <div>loading</div>}

                { users && (
                <div>
                    <span>
                        <strong>ID:</strong> {users.uid}
                    </span>
                    <span>
                        Email: {users.email}
                    </span>
                </div>
            )}
            </div>
            
        )
    }
 }


export default withFirebase(UserItem)
