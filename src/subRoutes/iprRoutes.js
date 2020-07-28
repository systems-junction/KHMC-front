import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
//import AddEditPatientListing from '../views/PatientListing/addEditPatientListing'
import IPR from '../views/ServicesRequest/PHR/IPR'

class EmergencyDR extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={IPR} />
        {/* <Route
          path={`${this.props.match.url}/add`}
          component={AddEditPatientListing}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditPatientListing}
        /> */}
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default EmergencyDR
