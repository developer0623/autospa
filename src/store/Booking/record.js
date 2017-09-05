import { Record, Map } from 'immutable'
import moment from 'moment'

const BookingRecord = Record({
  id: null,
  user: null,
  location: Map(),
  service: Map(),
  date: null,
  isWashing: true,
  slot: null,
  confirmed: false,
  createdAt: null
})

export default class Booking extends BookingRecord {
  start () {
    return new Date(this.date)
  }

  end () {
    return moment(this.date).add(this.service.time, 'minutes').toDate()
  }

  range () {
    let start = this.start()
    let end = this.end()
    let list = []

    while (start <= end) {
      list.push(start)
      start = moment(start).add(5, 'minutes').toDate()
    }

    return list
  }
}

// const getRange = (start, end, withouthFirstAndLast = false) => {
