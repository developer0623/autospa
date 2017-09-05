import { normalize, arrayOf } from 'normalizr-immutable'
import Schemas from 'store/schemas'

export const reduceBookings = (data, dispatch) => {
  const normalized = normalize(data, arrayOf(Schemas.booking), {})
  const { bookings } = normalized.entities

  dispatch({ type: 'RECEIVE_BOOKINGS', bookings })
}
