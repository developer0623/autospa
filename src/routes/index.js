import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from 'routes/Auth/Login/Container'
import Logout from 'routes/Auth/Logout/Container'
import Accounts from 'routes/Accounts/Container'
import Services from './Services/Container'
import Locations from './Locations/Container'
import NewLocation from './Locations/New/Container'
import NewBooking from './Booking/Container'
import { PrivateRoute } from 'components'

const Routes = ({ authenticated }) => (
  <Router>
    <div>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' component={Locations} exact authenticated={authenticated} />
      <PrivateRoute path='/logout' component={Logout} exact authenticated={authenticated} />
      <PrivateRoute path='/accounts' component={Accounts} exact authenticated={authenticated} />
      <PrivateRoute path='/locations' component={Locations} exact authenticated={authenticated} />
      <PrivateRoute path='/locations/new' component={NewLocation} exact authenticated={authenticated} />
      <PrivateRoute path='/services' component={Services} exact authenticated={authenticated} />
      <PrivateRoute path='/book' component={NewBooking} exact authenticated={authenticated} />
    </div>
  </Router>
)

Routes.propTypes = {
  authenticated: React.PropTypes.bool.isRequired
}

export default Routes
