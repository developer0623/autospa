import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserSelectors } from 'store/selectors'
import { UserActions } from 'store/actions'
import Home from './Home'

const connectState = state => ({ currentUser: UserSelectors.current(state) })
const connectProps = { ...UserActions }
const enhancer = connect(connectState, connectProps)

class LoginContainer extends Component {
  render () {
    return <Home {...this.props} />
  }
}

export default enhancer(LoginContainer)
