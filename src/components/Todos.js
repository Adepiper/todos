import React, { Component } from 'react'
import Todoitem from './Todoitem'

export class Todos extends Component {
    

    render() {
            if (this.props.todos){
                 return this.props.todos.map((todo) => (
                <React.Fragment>
                    <Todoitem key = {todo.uid} isCompleted = {this.props.isCompleted}  todo = {todo}/>
               </React.Fragment>
        ))
    } else {
        return ''
    }
    }
}



export default Todos
