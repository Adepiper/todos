import React, { Component } from 'react'
import Todos from './Todos'
import { withAuthorization,AuthUserContext, EmailVerifcation } from './session'
import {compose} from 'recompose'
import { withFirebase } from '../firebase'

export class TodoContainer extends Component {
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
          },
          
    
        ]
      }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        
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
   

  addTodo = (event, authUser) => {
    event.preventDefault()
      
    const { firebase} = this.props
    const {title} = this.state
    console.log(firebase)
    /*firebase.addTodo()
            .add({
              title
            
            })
        this.setState({
          title: ''
        })
        */

  }

    render() {
      
        return (
          <AuthUserContext.Consumer>
          { authUser =>(
            <div className="todos container my-4">
          <Todos deleteTodo = {this.deleteTodo} isCompleted ={this.isCompleted} todos = {this.state.todos} />
          <form onSubmit = {event => this.addTodo(event, authUser)} className="form-group my-3" action="">
                <div className="d-flex">
                <input className="form-control mr-4" type="text" name="title" id="" placeholder=" Add todo" value={this.state.title} onChange ={this.onChange}/>
               <span> <button   className="btn my-2 btn-primary float-right" type="submit">Add</button></span>
                </div>
            </form>
          </div>
          )
          }
          </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser

export default compose(withAuthorization(condition),withFirebase, EmailVerifcation)(TodoContainer)
