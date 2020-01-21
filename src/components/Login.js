import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
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
            const {firebase} = this.props
            console.log(firebase)
            firebase
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
       const {error, email, password} = this.state

       const invalid = email === '' || password === ''
        return (

            <div className="login">
            <div className="overlay">
            <div className="container">
                    <div className="card card-form mx-3">
                        <div className="card-body">
                            <form onSubmit={this.loginForm} action="">
                                {error && (<h5 className ="errors text-center">
                                    Incorrect email or password
                                </h5>)}
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email"  className="form-control" onChange={this.onChange} value={this.state.email} name="email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Password">Password:</label>
                                    <input type="password" className="form-control" onChange={this.onChange} value={this.state.password} name="password"/>
                                </div>
                                <div className="form-group float-center my-4">
                                    <button disabled={invalid} className="btn form-control btn-primary">Login</button>
                                </div>
                                    <div className='form-group d-flex'>
                                       <div id="link" className=" mr-auto">
                                       <ForgetPassword/>
                                            
                                            </div>
                                        <div className="">
                                            <Link id="link" to="/register">Don't have an account?</Link>
                                            </div>
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




export default compose(withRouter, withFirebase) (Login)
