import React, { Component } from 'react'
import {withFirebase} from '../firebase'


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
            todo, isCompleted
         }  = this.props
        return (
            <div  className ="todoItem my-3" style={this.getStyle()}>
                <input  type="checkbox"  className="px-2 mx-2"/>
                {todo.title}
                
            </div>
        )
    }
}

export default withFirebase(Todoitem)
