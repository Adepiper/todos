import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'
import Navbar from '../src/components/Navbar'
import Todos from '../src/components/Todos'
import AddTodo from '../src/components/AddTodo'
import Login from './components/Login'
import Signup from './components/Signup'
import * as ROUTES from './components/Routes'

import  ProtectedRoute from './components/ProtectedRoute'
import { logoutUser } from './actions';
import Forgotpassword from './components/Forgotpassword';
import ResetPassword from './components/ResetPassword';





class App extends Component {

  state = {
    todos: [
      {
        id: 1,
        title: 'Take Out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Go home',
        completed: true
      },
      {
        id: 3,
        title: 'Read further maths',
        completed: false
      }

    ]
  }
  
   isCompleted = (id) => {
     this.setState({
       todos: this.state.todos.map((todo) => {
          if (todo.id === id ){
            todo.completed = !todo.completed
          } return todo
       })
     })
   }


   deleteTodo = (id) => {
     this.setState({
       todos: [...this.state.todos.filter((todo) => 
         todo.id !== id
       )]
     })
   }

   addTodo = (title) => {
     const newTodo = {
       id: 4,
       title,
       completed: false
     }
     this.setState({
       todos : [...this.state.todos, newTodo]
     })
   }

   handleLogOut = (e) =>{
     console.log(e)
    const {dispatch} = this.props
    dispatch(logoutUser())
   }


  render() {
    const {isAuthenticated, isVerifying} = this.props

    return (

        <div className="App">
        <Route path= {ROUTES.Home} render = {
          prop => (
            <React.Fragment>
                <Navbar handleLogOut ={this.handleLogOut}/>
            </React.Fragment>
          )
        }>
        </Route>
         
          <Switch>
          <ProtectedRoute path={ROUTES.Todo} component={Todos} isAuthenticated = {isAuthenticated} isVerifying = {isVerifying}/>
          <Route path={ROUTES.login} Component = {Login}>
            <div className="container my-4">
                <Login/>
            </div>
        </Route>
          </Switch>

        <Route path={ROUTES.Todo} Component = {Todos}>
        <div className="todos container my-4">
          <Todos deleteTodo = {this.deleteTodo} isCompleted ={this.isCompleted} todos = {this.state.todos} />
          <AddTodo  addTodo = {this.addTodo}/>
          
          </div>
        </Route>

        <Route path={ROUTES.register} Component = {Signup}>
              <div className="container my-4">
            <Signup/>
            </div>
        </Route>
        <Route path={ROUTES.fgPassword} Component = {Forgotpassword}>
            <div className="container my-4">
          <Forgotpassword/>
            </div>
        </Route>
        <Route path = {ROUTES.resetPassword} Component = {ResetPassword} >
              <div className="container my-4">
                <ResetPassword/>
              </div>
        </Route>
        </div>
    )
  }
}
function mapStateToProps  (state)  {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying : state.auth.isVerifying,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  }
}

export default connect(mapStateToProps)(App)
