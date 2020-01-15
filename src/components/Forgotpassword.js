import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Routes from './Routes'


export class Forgotpassword extends Component {
    state = {
        email: ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    } 

    fgPassword = (e) => {
        e.preventDefault()

    }

    render() {

        
        return (
            <div className="card card-form">
            <div className="card-body">
                <form onSubmit={this.fgPassword}>
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

export default Forgotpassword
export {ForgetPassword}

