import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createUser} from '../actions'
import {Route, Redirect} from 'react-router-dom'
import * as Routes from './Routes'

export class Signup extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
        errors: {
            email: '',
            password: '',
            password2: ''
        },
        redirect: false
    }
    
    redirectTo = () => {
        return  <Redirect to={Routes.Todo} />
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
            const {dispatch, signupError } = this.props
            const {email, password, password2} = this.state
            if (signupError){
                this.setState({
                    email,
                    password,
                    password2
                })
        } else {
            dispatch(createUser(email, password))
            this.setState({
                email: '',
                password: '',
                password2: ''
            })
        }
        } else{
            console.log('invalid')
        } 
       
    }

    render() {
        const errors = this.state.errors
        const { signupError} = this.props
        
            return (
                <React.Fragment>
                <div className="card card-form">
                    <div className="card-body">
                        <form action="" onSubmit={this.registerForm}>
                         {signupError && <span className ="errors">That email has been registered</span>}
                            <div className="form-group mx-4">
                                 <label htmlFor="email">Email</label>
                                 <input type="email"  name="email" value ={this.state.email}  onChange={this.onChange} className="form-control"/>
                                 { errors.email.length > 0 && <span className="float-right mt-1 errors">{errors.email}</span>}
                            </div>
                            <div className="form-group mx-4">
                                 <label htmlFor="Password">Password</label>
                                 <input type="password" name="password" value ={this.state.password} onChange={this.onChange} className="form-control"/>
                                 { errors.password.length> 0 && <span className="float-right mt-1 errors">{errors.password}</span>}
                            </div>
                            <div className="form-group mx-4">
                                 <label htmlFor="confirm password">confrim password</label>
                                 <input type="password" name="password2" value={this.state.password2} onChange={this.onChange} className="form-control"/>
                                 { errors.password2.length> 0 && <span className="float-right mt-1 errors">{errors.password2}</span>}
                            </div>
                            <div className="form-group m-4 float-right ">
                                     <button className="btn btn-primary float-right">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                </React.Fragment>
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

  function mapStateToProps(state) {
      return {
          isSigningUp: state.auth.isSigningUp,
          signupError: state.auth.signupError
      }
  }

export default connect(mapStateToProps) (Signup)
