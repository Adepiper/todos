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
        
        const {errors, email} = this.state
        const invalid = email === ''
        return (
            <div className="login">
            <div className="overlay">
            <div className="container">
            <div className="card card-form mx-3">
            <div className="card-body">
                <form onSubmit={this.fgPassword}>
                {errors && <h5 className="errors text-center">Email not registered</h5>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email"  className="form-control" onChange={this.onChange} value={this.state.email} name="email"/>
                    </div>
                    <div className="formgroup">
                        <button disabled={invalid} className="btn btn-primary float-right">Confirm your Email</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
        </div>
        )
    }
}

const ForgetPassword = () => {
    return (
        <div>
            <Link id="link" to = {Routes.fgPassword} >Forgot Password?</Link>
        </div>
    )
}
export default withFirebase( Forgotpassword)
export {ForgetPassword}

