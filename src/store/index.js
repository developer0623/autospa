import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import errorHandler from '../utils/middlewares/errorHandler'
import createHistory from 'history/createBrowserHistory'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [errorHandler, thunk]
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middlewares)
))

export const history = createHistory()
export default store
