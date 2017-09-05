import { Map } from 'immutable'
import { combineReducers } from 'redux'

export default combineReducers({
  byId: locationsReducer
})

function locationsReducer (state = Map(), action) {
  switch (action.type) {
    case 'RECIEVE_LOCATIONS':
      return state.merge(action.locations)
    case 'REMOVE_LOCATION':
      return state.delete(action.id)
    default:
      return state
  }
}
