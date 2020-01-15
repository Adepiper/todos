import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {loginUser} from '../actions'
import  { ForgetPassword } from './Forgotpassword'

export class Login extends Component {

    state = {
        email: '',
        password: ''
    } 

        onChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        

        loginForm =(e) => {
            e.preventDefault()
            const {dispatch} =  this.props
            const {email, password} = this.state
            dispatch(loginUser(email, password))
        }


    render() {
        const { loginError, isAuthenticated} = this.props
        if (isAuthenticated){
            return <Redirect to ="/todos"/>
        } else {
        return (
            <React.Fragment>
                    <div className="card card-form">
                        <div className="card-body">
                            <form onSubmit={this.loginForm} action="">
                                {loginError && (<span className ="errors">
                                    Incorrect email or password
                                </span>)}
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email"  className="form-control" onChange={this.onChange} value={this.state.email} name="email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Password">Password:</label>
                                    <input type="password" className="form-control" onChange={this.onChange} value={this.state.password} name="password"/>
                                </div>
                                <div className="formgroup">
                                    <button className="btn btn-primary float-right">Login</button>
                                </div>
                                <ForgetPassword/>
                            </form>
                        </div>
                    </div>
            </React.Fragment>
        )
        }
    }
}

function mapStateToProps(state) {
    return {
        isLogginIn: state.auth.isLoggingIn, 
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps) (Login)
