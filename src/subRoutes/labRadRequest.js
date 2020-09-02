import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import labRadRequest from '../views/LabRadRequest/labRadRequest'
import triageAssessment from '../views/LabRadRequest/TriageAndAssessment'

class LabRadRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={labRadRequest}
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

export default LabRadRequest
