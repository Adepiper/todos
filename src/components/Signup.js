import React, { Component } from 'react'
import {withFirebase} from '../firebase'
import {withRouter, Link} from 'react-router-dom'
import * as ROUTES from './Routes'
import {compose} from 'recompose'

export class Signup  extends Component {
    constructor (props) {
        super(props)

   this.state = {
        email: '',
        password: '',
        password2: '',
        errors: {
            email: '',
            password: '',
            password2: '',
            signUp: ''
        },
        firebaseError: ''
    }
}

    onChange = (e) => {
        
        let errors = this.state.errors
        const {name, value} = e.target
       switch (name) {
           case 'email':
               errors.email = validEmailRegex.test(value) ? '' : 'Email is invalid'
               break;
                case 'password': 
                errors.password = value.length < 8 ? 'too short': ''
                break; 
                case 'password2':
                   errors.password2 = value === this.state.password ? '': 'Password Missmatch'
                break
           default:
               break;
       }
      this.setState({
         errors, [name] : value
      })
    }
    
    registerForm =(e ) => {
        e.preventDefault()
        if (validateErrors(this.state.errors)){
            const {email, password} = this.state
            this.props.firebase
                .createUserWithEmailAndPassword(email, password)
                    .then(authUser => {
                            this.props.firebase
                            .users()
                                .add({
                                    email 
                                })
                                })
                        
                        .then(() => {
                        this.setState({
                            email: '',
                            password: ''
                        })
                        this.props.history.push(ROUTES.login)
                    } )
                    .catch (err => {
                        console.log(err)
                        this.setState({
                            firebaseError : err
                        })
                    })
           
        } else {
            console.log('invalid')
        }
    }
    

    render() {
        const {errors, firebaseError, email, password, password2} = this.state
        const invalid = email ==='' || password === '' || password2 === '' 
            return (
                <div className="register">
                <div className="overlay">
                  <div className="container">
                <div className="card card-form mx-3">
                    <div className="card-body">
                        <form action="" onSubmit={this.registerForm}>
                         {firebaseError && <h5 className='errors mx-4 text-center'>That email is already registered</h5>}
                            <div className="form-group font-weight-bold">
                            { errors.email.length > 0 && <span className="float-right mt-1 errors">{errors.email}</span>}
                                 <label htmlFor="email">Email</label>
                                 <input type="email"  name="email" value ={this.state.email}  onChange={this.onChange} className="form-control"/>
                                 
                            </div>
                            <div className="form-group  font-weight-bold">
                            { errors.password.length> 0 && <span className="float-right mt-1 errors">{errors.password}</span>}
                                 <label htmlFor="Password">Password</label>
                                 <input type="password" name="password" value ={this.state.password} onChange={this.onChange} className="form-control"/>
                                 
                            </div>
                            <div className="form-group font-weight-bold">
                            { errors.password2.length> 0 && <span className="float-right mt-1 errors">{errors.password2}</span>}
                                 <label htmlFor="confirm password" >Confirm password</label>
                                 <input type="password" name="password2" value={this.state.password2} onChange={this.onChange} className="form-control"/>
                                 
                            </div>
                            <div className="form-group my-4 font-weight-bold">
                                <button disabled = {invalid} className="btn btn-primary form-control">Sign Up</button>
                            </div>

                            <div className='form-group '>
                                        <div className=" d-flex justify-content-center">
                                            <Link id="link" to="/Login">Already signed up? Login</Link>
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

    const validEmailRegex = 
            RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
    
 const validateErrors = (errors) => {
    let valid = true
    Object.values(errors).forEach((val) => {
        val.length > 0 && ( valid = false)
    })
    return valid
  }



export default compose(withFirebase, withRouter) (Signup)

