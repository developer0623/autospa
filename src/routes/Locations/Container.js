import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LocationSelectors } from 'store/selectors'
import { LocationActions } from 'store/actions'
import { HeaderNavigation } from 'components'
import List from './List'

const connectState = state => ({ locations: LocationSelectors.all(state) })
const connectProps = { ...LocationActions }
const enhancer = connect(connectState, connectProps)

class LocationsContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentDidMount () {
    this.props.getLocations()
  }

  render () {
    const { locations, removeLocation } = this.props
    const { router } = this.context

    return (
      <div>
        <HeaderNavigation />
        <div className='container'>
          <div className='notification'>
            <a
              onClick={() => router.history.push('/locations/new')}
              className='button'
            >
              Add location
            </a>
            <br />
            <br />
            <List locations={locations} remove={removeLocation} />
          </div>
        </div>
      </div>
    )
  }
}

export default enhancer(withRouter(LocationsContainer))
