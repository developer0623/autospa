import { Map } from 'immutable'
import { combineReducers } from 'redux'

export default combineReducers({
  byId: bookingsReducer,
  current: currentBookingReducer
})

function currentBookingReducer (state = Map(), action) {
  switch (action.type) {
    case 'SET_CURRENT_BOOKING':
      return state.set('id', action.id)

    case 'REMOVE_CURRENT_BOOKING':
      return state.set('id', undefined)

    default:
      return state
  }
}

function bookingsReducer (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_BOOKINGS':
      return state.merge(action.bookings)

    default:
      return state
  }
}
