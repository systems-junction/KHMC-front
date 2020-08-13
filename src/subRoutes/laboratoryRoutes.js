/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import addEditLaboratoryService from '../views/RCM/ServiceManagement/LaboratoryService/addEditLaboratoryService'
import laboratoryService from '../views/RCM/ServiceManagement/LaboratoryService/laboratoryService'

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={laboratoryService}
        />
        <Route
          path={`${this.props.match.url}/add`}
          component={addEditLaboratoryService}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={addEditLaboratoryService}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default PurchaseRequest
