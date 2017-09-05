import React from 'react'
import { connect } from 'react-redux'
import { UserActions } from 'store/actions'
import { Redirect } from 'react-router-dom'

const connectProps = { ...UserActions }
const enhancer = connect(null, connectProps)

class LogoutContainer extends React.Component {
  static PropTypes = {
    logoutUser: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.logoutUser()
  }

  render () {
    return <Redirect to='/login' />
  }
}

export default enhancer(LogoutContainer)
