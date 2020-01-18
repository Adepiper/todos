import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import  { ForgetPassword } from './Forgotpassword'
import * as ROUTES from './Routes'
import { withFirebase } from '../firebase'

export class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: null
    } 

        onChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        

        loginForm =(e) => {
            e.preventDefault()
            const {email, password} = this.state
            this.props.firebase
                .loginUserWithEmailAndPassword(email, password)
                    .then(() => {
                        this.setState({
                            email: '',
                            password: ''
                        })
                        this.props.history.push(ROUTES.Todo)
                        })
                        .catch(err => {
                            this.setState({
                                error: err
                            })
                    })
        }


    render() {
       const {error} = this.state
        return (
            <React.Fragment>
                    <div className="card card-form">
                        <div className="card-body">
                            <form onSubmit={this.loginForm} action="">
                                {error && (<span className ="errors">
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




export default compose(withRouter, withFirebase) (Login)
