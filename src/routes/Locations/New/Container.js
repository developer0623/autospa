import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LocationActions } from 'store/actions'
import { HeaderNavigation } from 'components'
import Form from './Form'

const connectProps = { ...LocationActions }
const enhancer = connect(null, connectProps)

class NewLocationContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleSubmit (data) {
    this.props.createLocation(data)
    this.context.router.history.push('/locations')
  }

  render () {
    return (
      <div>
        <HeaderNavigation />
        <div className='container'>
          <div className='notification'>
            <Form onSubmit={this.handleSubmit.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default enhancer(withRouter(NewLocationContainer))
