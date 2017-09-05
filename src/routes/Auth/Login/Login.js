import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, FormContainer, Button } from './LoginStyles'

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  state = { email: '', password: '' }

  submit () {
    const payload = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(payload)
  }

  render () {
    return (
      <Container>
        <FormContainer>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                className='input'
                type='text'
                placeholder='Email'
              />
            </p>
            <br />
            <p className='control is-expanded'>
              <input
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                className='input'
                type='password'
                placeholder='Password'
              />
            </p>
            <br />
            <p className='control'>
              <Button className='button is-primary' onClick={this.submit.bind(this)}>
                Login
              </Button>
            </p>
          </div>
        </FormContainer>
      </Container>
    )
  }
}

export default withRouter(Login)
