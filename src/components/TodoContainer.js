import React, { Component } from 'react'
import Todos from './Todos'
import AddTodo from './AddTodo'
import { withAuthorization } from './session'

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

    render() {
        return (
            <div className="todos container my-4">
          <Todos deleteTodo = {this.deleteTodo} isCompleted ={this.isCompleted} todos = {this.state.todos} />
          <AddTodo  addTodo = {this.addTodo}/>
          </div>
        )
    }
}

const condition = authUser => !!authUser

export default withAuthorization (condition)(TodoContainer)
