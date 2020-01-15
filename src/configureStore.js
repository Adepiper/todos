import {applyMiddleware, createStore} from 'redux'
import ThunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {verifyUser} from './actions'



export default function configureStore (persistedState){
    const store = createStore(
        rootReducer,
        persistedState,
        applyMiddleware(ThunkMiddleware)
    )
    store.dispatch(verifyUser())
    return store
}