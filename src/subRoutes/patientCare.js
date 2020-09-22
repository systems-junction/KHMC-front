import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import patientCare from '../views/PatientCare/patientCare'
import triageAssessment from '../views/PatientCare/TriageAndAssessment'
import SuccessScreen from '../components/SuccessScreen/SuccessScreen'
import viewReport from '../views/PatientAssessment/viewLabRadReport'

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
        <Route
          path={`${this.props.match.url}/viewReport`}
          component={viewReport}
        />
        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default PatientCare
