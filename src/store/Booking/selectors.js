import { createSelector } from 'reselect'
import { all as allServices } from 'store/Service/selectors'
import { all as allLocations } from 'store/Location/selectors'

export const all = state => state.Booking.byId

export const list = createSelector(
  [all, allServices, allLocations],
  (bookings, services, locations) => {
    return bookings
      .map(booking =>
        booking
          .update('service', id => services.get(id))
          .update('location', id => locations.get(id))
      ).toList()
  }
)
