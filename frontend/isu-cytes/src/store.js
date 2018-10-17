import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

//import { routerReducer } from 'react-router-redux'

import userReducer from './reducers/userReducer.js'
import {history} from './history.js'

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  //routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const rootReducer = combineReducers({
  /*routing: routerReducer,*/
  userReducer: userReducer
})

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)
