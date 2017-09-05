import { Record } from 'immutable'
import { getDistance } from 'utils/location'
import moment from 'moment'

const LocationRecord = Record({
  id: '',
  name: '',
  address: '',
  slots: null,
  opensAt: '',
  closesAt: '',
  saturdayOpensAt: '',
  saturdayClosesAt: '',
  sundayOpensAt: '',
  sundayClosesAt: '',
  latitude: null,
  longitude: null
})

export default class Location extends LocationRecord {
  distance ({ latitude, longitude }) {
    return getDistance(this.latitude, this.longitude, latitude, longitude)
  }

  isAvailable (start, bookings) {
    let workingRanges = this.workingHoursRange(new Date(start))

    bookings = bookings.map(({ date, service }) => {
      const ranges = getRange(date, service.calculateFinishTime(date))
      return ranges
    }).reduce((a, b) => a.concat(b))

    return bookings.filter(x => {
      const index = workingRanges.findIndex(y => y.getTime() === x.getTime())
      if (index === -1) return false

      workingRanges.splice(index, 1)
      return true
    }).length === bookings.length
  }

  workingHoursRange (date) {
    const opensAt = this.currentOpensAt(date)
    const closesAt = this.currentClosesAt(date)
    const { opens, closes } = getOpenAndCloseDates(date, opensAt, closesAt)
    return getRange(opens, closes)
  }

  availableHours (date, bookings) {
    let wranges = this.workingHoursRange(date)

    bookings.forEach(booking => {
      let ranges = getRange(booking.start(), booking.end(), true)
      ranges.forEach(y => {
        wranges = wranges.map(w => {
          if (w !== null && w.getTime() === y.getTime()) {
            return null
          } else {
            return w
          }
        })
      })
    })

    return wranges
  }

  currentOpensAt (date) {
    if (date.getDay() === 6) {
      return this.saturdayOpensAt
    } else if (date.getDay() === 0) {
      return this.sundayOpensAt
    } else {
      return this.opensAt
    }
  }

  currentClosesAt (date) {
    if (date.getDay() === 6) {
      return this.saturdayClosesAt
    } else if (date.getDay() === 0) {
      return this.sundayClosesAt
    } else {
      return this.closesAt
    }
  }
}

const getRange = (start, end, withouthFirstAndLast = false) => {
  let list = []

  while (start <= end) {
    list.push(start)
    start = moment(start).add(5, 'minutes').toDate()
  }

  if (withouthFirstAndLast) {
    list.splice(0, 1)
    list.pop()
  }

  return list
}

const hrsAndMins = time => {
  const hrsAndMins = time.split(':')
  return { hour: hrsAndMins[0], mins: hrsAndMins.length > 1 ? hrsAndMins[1] : '0' }
}

const getOpenAndCloseDates = (date, open, close) => ({
  opens: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hrsAndMins(open).hour, hrsAndMins(open).mins),
  closes: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hrsAndMins(close).hour, hrsAndMins(close).mins)
})
