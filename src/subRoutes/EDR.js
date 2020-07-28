/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import edr from '../views/EDR/EDR'
import viewEDR from '../views/EDR/viewEDR'
import addEditEDR from '../views/EDR/addEditEDR'
import TriageAndAssessment from '../views/EDR/TriageAndAssessment'

class EmergencyDR extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={edr} />

        <Route
          exact
          path={`${this.props.match.url}/viewEDR`}
          component={viewEDR}
        />

        <Route
          path={`${this.props.match.url}/viewEDR/add`}
          component={addEditEDR}
        />

        <Route
          path={`${this.props.match.url}/viewEDR/TriageAndAssessment`}
          component={TriageAndAssessment}
        />
        
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default EmergencyDR
