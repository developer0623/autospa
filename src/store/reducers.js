import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Alert from './Alert/reducers'
import User from './User/reducers'
import Service from './Service/reducers'
import Location from './Location/reducers'
import Booking from './Booking/reducers'

const appReducer = combineReducers({
  form: formReducer,
  Alert,
  User,
  Service,
  Location,
  Booking
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
