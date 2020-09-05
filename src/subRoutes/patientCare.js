import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import patientCare from '../views/PatientCare/patientCare'
import triageAssessment from '../views/PatientCare/TriageAndAssessment'

class PatientCare extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={patientCare}
        />
        <Route
          path={`${this.props.match.url}/triageAssessment`}
          component={triageAssessment}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default PatientCare