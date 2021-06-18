import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import punsReducer from './allPuns'
import allUsersReducer from './allUsers'
import orderReducer from './order'
import singlePunReducer from './singlePun'
import singleUserReducer from './singleUser'

import auth from './auth'

const reducer = combineReducers({ 
  auth, 
  allPuns: punsReducer, 
  singlePun: singlePunReducer,
  singleUser: singleUserReducer,
  allUsers: allUsersReducer, 
  orders: orderReducer,  })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
