import firebase from 'store/firebase'
import { toArray } from 'utils/firebase'
import { reduceServices } from './helpers'
import { reset } from 'redux-form'

export const getServices = () => async dispatch => {
  const data = await firebase.ref('services').once('value')
  reduceServices(toArray(data.val()), dispatch)
}

export const addService = payload => async dispatch => {
  const { key } = await firebase.ref('services').push({ ...payload })
  const service = { id: key, ...payload }

  reduceServices([service], dispatch)
  dispatch(reset('service'))
}

export const removeService = id => dispatch => {
  firebase.ref('services').child(id).remove()
  dispatch({ type: 'REMOVE_SERVICE', id })
}
