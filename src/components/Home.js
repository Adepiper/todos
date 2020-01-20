import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import * as ROUTES from './Routes'

export class Home extends Component {

    click = () => {
        this.props.history.push(ROUTES.Todo)
    }

    render() {
        return (
            <div className="Home">
                <div className="overlay">
                <div className="container">
                    <div className="jumbotron text-center">
                        <button className="btn btn-primary" onClick={this.click} >Get started </button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(Home)
