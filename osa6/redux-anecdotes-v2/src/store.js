import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import { applyMiddleware } from '../../../../../.cache/typescript/2.6/node_modules/redux';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})


const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store