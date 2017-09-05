import { reduceUsers } from './helpers'
import { auth } from 'store/firebase'

export const setCurrentUser = user => {
  return { type: 'SET_CURRENT_USER', id: user.id }
}

export const logoutUser = () => async dispatch => {
  auth.signOut().then(() => dispatch({ type: 'RESET_STATE' }))
}

export const loginUser = payload => async dispatch => {
  await auth.signInWithEmailAndPassword(payload.email, payload.password)
}

export const reAuthenticate = payload => async dispatch => {
  const data = { id: payload.uid, email: payload.email }
  reduceUsers([data], dispatch)
  dispatch(setCurrentUser(data))
}
