import React, { Component } from 'react'
import Todoitem from './Todoitem'

export class Todos extends Component {
  
    
   
    render() {
            if (this.props.todos){
                 return this.props.todos.map((todo) => (
                <React.Fragment>
                    <Todoitem deleteTodo = {this.props.deleteTodo} key = {todo.id} isCompleted = {this.props.isCompleted}  todo = {todo}/>
                    
               </React.Fragment>
        ))
    } else {
        return ''
    }
    }
}



export default Todos
