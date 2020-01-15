import React, { Component } from 'react'

export class AddTodo extends Component {
    state = {
        title : ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.addTodo(this.state.title)
        this.setState({
            title : ''
        })
    }
    render() {
        return (
            <form onSubmit ={this.onSubmit} className="form-group my-3" action="">
                <div className="d-flex">
                <input className="form-control mr-4" type="text" name="title" id="" placeholder=" Add todo" value={this.state.title} onChange ={this.onChange}/>
               <span> <button   className="btn my-2 btn-primary float-right" type="submit">Add</button></span>
                </div>
            </form>
        )
    }
}

export default AddTodo
