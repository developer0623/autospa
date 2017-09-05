import { normalize, arrayOf } from 'normalizr-immutable'
import Schemas from 'store/schemas'

export const reduceLocations = (data, dispatch) => {
  const normalized = normalize(data, arrayOf(Schemas.location), {})
  const locations = normalized.entities.locations

  dispatch({ type: 'RECIEVE_LOCATIONS', locations })
}
