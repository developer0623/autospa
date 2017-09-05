import { Map } from 'immutable'
import { combineReducers } from 'redux'

export default combineReducers({
  byId: servicesReducer
})

function servicesReducer (state = Map(), action) {
  switch (action.type) {
    case 'RECIEVE_SERVICES':
      return state.merge(action.services)

    case 'REMOVE_SERVICE':
      return state.delete(action.id)

    default:
      return state
  }
}
