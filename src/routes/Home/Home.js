import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { HeaderNavigation } from 'components'

export default class Home extends Component {
  static propTypes = {
    currentUser: ImmutablePropTypes.record
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}
