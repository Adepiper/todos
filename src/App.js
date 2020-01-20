import React, { Component } from 'react';
import { Route} from 'react-router-dom'
import './App.css';
import Navbar from '../src/components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import * as ROUTES from './components/Routes'
import {withFirebase} from './firebase'
import Forgotpassword from './components/Forgotpassword';
import ResetPassword from './components/ResetPassword';
import TodoContainer from './components/TodoContainer';
import Home from './components/Home';
import { AuthUserContext } from './components/session';
import { Admin } from './components/Admin';


class App extends Component {

  state = {
    authUser: null
  }

componentDidMount = () => {
   this.listener= this.props.firebase
          .auth
            .onAuthStateChanged(authUser => {

              if (authUser) {
                this.setState({
                  authUser
                })
              } else {
                this.setState({
                  authUser: null
                })
              }
            })
} 

componentWillUnmount = () => {
  this.listener()
}


  render() {
    return (
      <AuthUserContext.Provider value = {this.state.authUser}>
        <div className="App">
          <Navbar authUser = {this.state.authUser}/>
        <Route exact path= {ROUTES.Home} render = {
          prop => (
            <React.Fragment>
                <Home/>
            </React.Fragment>
          )
        }>
        </Route>
          <Route path={ROUTES.login} Component = {Login}>
            <React.Fragment>
                <Login/>
            </React.Fragment>
        </Route>
          
        
        <Route path={ROUTES.Todo} Component = {TodoContainer}>
            <React.Fragment>
              <TodoContainer/>
            </React.Fragment>
        </Route>

        <Route path={ROUTES.register} Component = {Signup}>
             <React.Fragment>
             <Signup/>
             </React.Fragment>
                
                
            
        </Route>
        <Route path={ROUTES.fgPassword} Component = {Forgotpassword}>
            <React.Fragment>
          <Forgotpassword/>
          </React.Fragment>
            
        </Route>
        <Route path = {ROUTES.resetPassword} Component = {ResetPassword}>
              <div className="container my-4">
                <ResetPassword/>
              </div>
        </Route>
        <Route path ={ROUTES.Admin} Component = {Admin}>
            <Admin/>
        </Route>
        </div>
        </AuthUserContext.Provider>
    )
  }
}


export default withFirebase(App)
