import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { UserActions } from 'store/actions'
import { UserSelectors } from 'store/selectors'
import { Alerts } from 'components'
import Routes from 'routes'
import { auth } from 'store/firebase'

const connectState = state => ({ currentUser: UserSelectors.current(state) })
const connectProps = { ...UserActions }
const enhancer = connect(connectState, connectProps)

class AppComponent extends React.Component {
  static propTypes = {
    currentUser: ImmutablePropTypes.record,
    reAuthenticate: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) this.props.reAuthenticate(user)
    })
  }

  render () {
    // if (!this.props.currentUser) return null

    return (
      <div>
        <Alerts />
        <Routes authenticated={!!this.props.currentUser} />
      </div>
    )
  }
}

export default enhancer(AppComponent)
