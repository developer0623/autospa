import { normalize, arrayOf } from 'normalizr-immutable'
import Schemas from 'store/schemas'

export const reduceUsers = (data, dispatch) => {
  const normalized = normalize(data, arrayOf(Schemas.user), {})
  const users = normalized.entities.users

  dispatch({ type: 'RECEIVE_USERS', users })
}
