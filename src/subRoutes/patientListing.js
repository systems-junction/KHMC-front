import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import AddEditPatientListing from '../views/PatientListing/addEditPatientListing'
import patientListing from '../views/PatientListing/patientListing'

class PatientListing extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={patientListing}
        />
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditPatientListing}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditPatientListing}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default PatientListing
