import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './Root';
import Firebase , {FirebaseContext} from './firebase'

const rootElement = document.getElementById('root')


        if (rootElement.hasChildNodes()){
          ReactDOM.hydrate(
            <FirebaseContext.Provider value = {new Firebase()} >
              <Root />
              </FirebaseContext.Provider>, 
              rootElement);
        } else {
          ReactDOM.render(
            <FirebaseContext.Provider value = {new Firebase()} >
              <Root />
              </FirebaseContext.Provider>, 
              rootElement);
        }


        

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
