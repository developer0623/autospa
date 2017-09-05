import { Record } from 'immutable'

const UserRecord = Record({
  id: null,
  email: '',
  displayName: ''
})

export default class User extends UserRecord {
}
