import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Routes from './Routes'
import { withFirebase } from '../firebase'

export class Forgotpassword extends Component {
    state = {
        email: '',
        errors: null
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    } 

    fgPassword = (e) => {
        e.preventDefault()
        const {email} = this.state
        const {firebase} = this.props
       firebase
        .resetUserEmail(email)
            .then(() => {
                this.setState({
                    email: ''
                })
            })
            .catch((err) => {
                this.setState({
                    errors : err
                })
            })
    }

    render() {
        
        const {errors} = this.state
        return (
            
            <div className="card card-form">
               
            <div className="card-body">
            
                <form onSubmit={this.fgPassword}>
                {errors && <span className="errors">Email not registered</span>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email"  className="form-control" onChange={this.onChange} value={this.state.email} name="email"/>
                    </div>
                    <div className="formgroup">
                        <button className="btn btn-primary float-right">Confirm your Email</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

const ForgetPassword = () => {
    return (
        <div>
            <Link to = {Routes.fgPassword} >Forgot Password</Link>
        </div>
    )
}

export default withFirebase( Forgotpassword)
export {ForgetPassword}

