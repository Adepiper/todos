import React, { Component } from 'react'
import { withAuthorization,AuthUserContext, EmailVerifcation } from './session'
import {compose} from 'recompose'
import Todos from './Todos'
import { withFirebase } from '../firebase'

export class TodoContainer extends Component {
    state = {
        title: '',
        todos: [],
        loading: false
        
      }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
   
    componentDidMount () {
      const {firebase} = this.props

      this.setState({
        loading: true
      })

      firebase.todos().on('value', snapshot => {

        const todosObject = snapshot.val()

        if(todosObject) {

            const todosList = Object.keys(todosObject).map( key => ({
              ...todosObject[key],
              uid: key , 
              isCompleted: false
            }))
          this.setState({
            todos : todosList,
            loading: false,
          })
        } else {
          this.setState({
            todos: null,
            loading: false
          })
        }
        
      })
    }

    componentWillUnmount () {
      const {firebase} = this.props
      firebase.todos().off()
    }

      isCompleted = (uid) => {
        this.setState({
          todos: this.state.todos.map((todo) => {
             if (todo.id === uid ){
               todo.completed = !todo.completed
             } return todo
          })
        })
      }

   deleteTodo = (uid) => {
    const {firebase} = this.props

    firebase.todo(uid).remove()
  }
   

  addTodo = (event, authUser) => {
    event.preventDefault()
      
    const { firebase} = this.props
    const {title} = this.state
    firebase.todos().push({
      title: title,
      userId: authUser.uid,
      isCompleted: false
    })
      this.setState({
        title: ''
      })
  }

    render() {
      const {todos, loading, title} =this.state
        return (
          <AuthUserContext.Consumer>
          { authUser =>(
            <div className="todos container my-4">
            {loading && <div>loading</div>}
          <Todos todos = {todos} isCompleted = {this.isCompleted}/>
          <form onSubmit = {event => this.addTodo(event, authUser)} className="form-group my-3" action="">
                <div className="d-flex">
                <input className="form-control mr-4" type="text" name="title" id="" placeholder=" Add todo" value={title} onChange ={this.onChange}/>
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