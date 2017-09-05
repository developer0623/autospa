import React, { PropTypes } from 'react'
import { Route } from 'react-router-dom'
import Login from 'routes/Auth/Login/Container'

const PrivateRoute = ({ authenticated, component, ...rest }) => (
  <Route {...rest} render={props => (
    authenticated ? (
      React.createElement(component, props)
    ) : (
      <Login from={props.location} unauthorized />
    )
  )} />
)

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func
}

export default PrivateRoute
