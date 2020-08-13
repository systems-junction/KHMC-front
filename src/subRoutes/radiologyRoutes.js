/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import addEditRadiologyService from '../views/RCM/ServiceManagement/RadiologyService/addEditRadiologyService'
import radiologyService from '../views/RCM/ServiceManagement/RadiologyService/radiologyService'

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={radiologyService}
        />
        <Route
          path={`${this.props.match.url}/add`}
          component={addEditRadiologyService}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={addEditRadiologyService}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default PurchaseRequest
