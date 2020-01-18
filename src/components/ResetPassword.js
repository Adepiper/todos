import React, { Component } from 'react'
import { withAuthorization } from './session'



export class ResetPassword extends Component {
    state = {
        password: '',
        password2: '',
        error: null
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    confirmPassword = () => {
        const {password, password2} = this.state

        return (password === password2 ? true : false)
    }

    reset = (e) => {
        e.preventDefault()
        const {password} = this.state
        this.props.firebase
            .updateUserPassword(password)
                .then(() => {
                    this.setState({
                        password: '',
                        password2: ''
                    })
                })
                .catch((err) => {
                    this.setState({
                        error : err
                    })
                })
    }

    render() {
        const {error} = this.state

        return (
            <div className="card card-form">
            <div className="card-body">
                <form onSubmit={this.reset}>
                {error && <span>Please type in a new Password</span>}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"  className="form-control" onChange={this.onChange} value={this.state.password} name="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm password</label>
                        <input type="password"  className="form-control" onChange={this.onChange} value={this.state.password2} name="password2"/>
                    </div>
                    <div className="formgroup">
                        <button className="btn btn-primary float-right">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(ResetPassword)
