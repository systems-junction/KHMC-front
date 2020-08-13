import React from 'react'
import cookie from 'react-cookies'
import { Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFound from '../components/NotFound/NotFound'

import ServicesRequest from '../views/RCM/ServiceManagement/ServiceMgmtHome/ServiceMgmtTree'
import Radiology from './radiologyRoutes'
import Surgery from './surgeryRoutes'
import Laboratory from './laboratoryRoutes'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load('current_user')
  )

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.staffTypeId.type === 'admin' ||
        currentUser.staffTypeId.type === 'Committe Member' ||
        currentUser.staffTypeId.type === 'Accounts Member' ||
        currentUser.staffTypeId.type === 'Warehouse Member' ? (
          <Component {...props} />
        ) : (
          <Redirect to='notfound' />
        )
      }
    />
  )
}

class WMSRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={ServicesRequest}
        />

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />

        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default WMSRoutes
