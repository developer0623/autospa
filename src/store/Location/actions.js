import firebase from 'store/firebase'
import { toArray } from 'utils/firebase'
import { coordsFromAddress } from 'utils/location'
import { reduceLocations } from './helpers'
import { reset } from 'redux-form'

export const getLocations = () => async dispatch => {
  const locations = await firebase.ref('locations').once('value')
  reduceLocations(toArray(locations.val()), dispatch)
}

export const createLocation = payload => async dispatch => {
  const coords = await coordsFromAddress(payload.address)
  const { key } = await firebase.ref('locations').push({ ...payload, ...coords })
  const location = { id: key, ...payload }

  reduceLocations([location], dispatch)
  dispatch(reset('location'))
}

export const removeLocation = id => dispatch => {
  firebase.ref('locations').child(id).remove()
  dispatch({ type: 'REMOVE_LOCATION', id })
}
