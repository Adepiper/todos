import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App'
import configureStore from './configureStore'


const Store = configureStore()
function Root() {
    return (
       <Provider store= {Store}>
            <Router>
                <App/>
            </Router>
       </Provider>
    )
}

export default Root
