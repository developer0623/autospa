import { normalize, arrayOf } from 'normalizr-immutable'
import Schemas from 'store/schemas'

export const reduceServices = (data, dispatch) => {
  const normalized = normalize(data, arrayOf(Schemas.service), {})
  const services = normalized.entities.services

  dispatch({ type: 'RECIEVE_SERVICES', services })
}
