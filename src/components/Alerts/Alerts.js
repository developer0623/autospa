import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { AlertActions } from 'store/actions'
import { AlertSelectors } from 'store/selectors'
import Alert from './Alert'

let connectProps = state => ({
  alert: AlertSelectors.first(state)
})

let connectActions = {
  removeAlert: AlertActions.removeAlert
}

let enhancer = connect(connectProps, connectActions)

class Alerts extends Component {
  static propTypes = {
    alert: ImmutablePropTypes.map
  }

  render () {
    let { alert, removeAlert } = this.props
    if (!alert) return false

    return (
      <Alert
        type={alert.get('type')}
        alerts={alert.get('list')}
        removeAlert={removeAlert}
      />
    )
  }
}

export default enhancer(Alerts)
