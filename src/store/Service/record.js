import { Record } from 'immutable'

const ServiceRecord = Record({
  id: '',
  name: '',
  type: '',
  typeName: '',
  description: '',
  price: null,
  time: 0
})

export default class Service extends ServiceRecord {
  duraction () {
    return parseInt(this.time)
  }

  calculateFinishTime (start) {
    start = new Date(start)
    return new Date(start.setMinutes(start.getMinutes() + this.duraction()))
  }
}
