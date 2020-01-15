import React, { Component } from 'react'

export class Todoitem extends Component {
 
    getStyle = () => {
        if(this.props.todo.completed){
            return {
                textDecoration: 'line-through'
            }} else {
                return {
                    textDecoration: 'none'
                }
            }
    }
    
    
    render() {
        const {
            id,title
         }  = this.props.todo
        return (
            <div className ="todoItem my-3" style={this.getStyle()}>
                <input type="checkbox" onChange ={this.props.isCompleted.bind(this, id )} className="px-2 mx-2"/>
                {title}
                <button onClick={this.props.deleteTodo.bind(this, id)}  className="btn btn-danger float-right">Delete</button>
            </div>
        )
    }
}

export default Todoitem
