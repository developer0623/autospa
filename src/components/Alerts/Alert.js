import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Container, Close, AlertError, AlertSuccess } from './AlertStyles'

export default class Alert extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    alerts: ImmutablePropTypes.list.isRequired,
    removeAlert: PropTypes.func.isRequired
  }

  componentDidMount () {
    setTimeout(this.props.removeAlert, 5000)
  }

  renderContent (alerts) {
    if (alerts.size === 1) {
      return alerts
    } else {
      return <ul>{alerts.map((item, key) => <li key={key}>{item}</li>)}</ul>
    }
  }

  render () {
    let { type, alerts, removeAlert } = this.props
    let AlertType = type === 'error' ? AlertError : AlertSuccess

    return (
      <Container>
        <AlertType>
          {this.renderContent(alerts)}
          <Close onClick={removeAlert} />
        </AlertType>
      </Container>
    )
  }
}
