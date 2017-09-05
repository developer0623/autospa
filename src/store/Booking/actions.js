import { reduceBookings } from './helpers'
import firebase from 'store/firebase'
import { toArray } from 'utils/firebase'
import moment from 'moment'

export const getBookings = user => async dispatch => {
  const yesterday = moment().add(-1, 'days').toDate()
  let bookings = await firebase.ref('bookings').once('value')
  bookings = toArray(bookings.val())

  bookings = bookings.filter(booking => {
    if (booking.user === user.id) return true
    return booking.date > yesterday
  })
  reduceBookings(bookings, dispatch)
}

export const createBooking = payload => async dispatch => {
  const { key } = await firebase.ref('bookings').push(payload)
  const booking = { id: key, ...payload }

  reduceBookings([booking], dispatch)
  dispatch({ type: 'RECEIVE_BOOKING', booking })
}
