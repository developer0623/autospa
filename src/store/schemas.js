import { Schema } from 'normalizr-immutable'
import {
  User,
  Service,
  Location,
  Booking
} from './records'

const schemas = {
  user: new Schema('users', User),
  service: new Schema('services', Service),
  location: new Schema('locations', Location),
  booking: new Schema('bookings', Booking)
}

export default schemas
