import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ServiceSelectors } from 'store/selectors'
import { ServiceActions } from 'store/actions'
import { HeaderNavigation } from 'components'
import List from './List'
import Form from './Form'

const connectState = state => ({ services: ServiceSelectors.all(state) })
const connectProps = { ...ServiceActions }
const enhancer = connect(connectState, connectProps)

class ServicesContainer extends React.Component {
  state = { show: false }

  componentDidMount () {
    this.props.getServices()
  }

  handleSubmit (data) {
    this.props.addService(data)
    this.setState({ show: false })
  }

  render () {
    const { services, removeService } = this.props
    return (
      <div>
        <HeaderNavigation />
        <div className='container'>
          <div className='notification'>
            <a onClick={() => this.setState({ show: true })} className='button'>
              Add service
            </a>
            <br />
            <br />
            <List services={services} remove={removeService} />
          </div>
        </div>
        <Form
          show={this.state.show}
          hide={() => this.setState({ show: false })}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default enhancer(withRouter(ServicesContainer))
