import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AlertActions, UserActions } from 'store/actions'
import { UserSelectors } from 'store/selectors'
import Login from './Login'

const connectState = state => ({ currentUser: UserSelectors.current(state) })
const connectProps = { ...AlertActions, ...UserActions }
const enhancer = connect(connectState, connectProps)

class LoginContainer extends Component {
  render () {
    if (this.props.currentUser) {
      return <Redirect to='/' />
    }

    return <Login {...this.props} />
  }
}

export default enhancer(withRouter(LoginContainer))
