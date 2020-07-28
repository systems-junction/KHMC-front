import React from 'react'
import cookie from 'react-cookies'
import { Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFound from '../components/NotFound/NotFound'

import PHR from '../views/ServicesRequest/PHR/PHR'

import EDR from './edrRoutes'
import IPR from './iprRoutes'
import ViewIPR from '../views/ServicesRequest/PHR/viewIPR'
import ViewEDR from '../views/ServicesRequest/PHR/viewEDR'
import EDRTriageAndAssessment from '../views/ServicesRequest/PHR/EDRTriageAndAssessment'
import IPRTriageAndAssessment from '../views/ServicesRequest/PHR/IPRTriageAndAssessment'

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
        {/* <PrivateRoute
          path={`${this.props.match.url}/staff`}
          component={StaffRoutes}
        /> */}

        <Route exact path={`${this.props.match.url}`} component={PHR} />
        <Route exact path={`${this.props.match.url}/edr`} component={EDR} />
        <Route exact path={`${this.props.match.url}/ipr`} component={IPR} />
        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR`}
          component={ViewIPR}
        />
        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR`}
          component={ViewEDR}
        />
        <Route
          path={`${this.props.match.url}/edr/viewEDR/TriageAndAssessment`}
          component={EDRTriageAndAssessment}
        />
        <Route
          path={`${this.props.match.url}/ipr/viewIPR/TriageAndAssessment`}
          component={IPRTriageAndAssessment}
        />
        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />

        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default WMSRoutes
