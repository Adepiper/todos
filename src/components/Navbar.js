import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


export class Navbar extends Component {



  render(){
      const {isAuthenticated} = this.props

      if (isAuthenticated) {
        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to="/">Todos</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/todos" tabIndex="-1">Todo</Link>
                  </li>
                  <li className="nav-item">
                  <Link to="" onClick= {this.props.handleLogOut} className="nav-link">logout</Link>
                </li>
                </ul>
             </div>
            </nav>
          </div>
      )
      } else {
          return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Todos</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
               
              </ul>
           </div>
          </nav>
        </div>
    )
          }
        }
}

function mapStateToProps  (state)  {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps) (Navbar)
