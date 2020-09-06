import React from 'react'
import cookie from 'react-cookies'
import { Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFound from '../components/NotFound/NotFound'

import RR from '../views/ServicesRequest/RR/RR'
import EDR from '../views/ServicesRequest/RR/EDR'
import IPR from '../views/ServicesRequest/RR/IPR'
import OPR from '../views/ServicesRequest/RR/OPR'
import ViewIPR from '../views/ServicesRequest/RR/viewIPR'
import ViewEDR from '../views/ServicesRequest/RR/viewEDR'
import ViewOPR from '../views/ServicesRequest/RR/viewOPR'
import UpdateRR from '../views/ServicesRequest/RR/updateRR'
import EDRTriageAndAssessment from '../views/ServicesRequest/PHR/EDRTriageAndAssessment'
import IPRTriageAndAssessment from '../views/ServicesRequest/PHR/IPRTriageAndAssessment'
import AddEditOPR from '../views/ServicesRequest/RR/addEditOPR'
import AddRadioOPR from '../views/ServicesRequest/RR/addRadiology'

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

        <Route exact path={`${this.props.match.url}`} component={RR} />
        <Route exact path={`${this.props.match.url}/edr`} component={EDR} />
        <Route exact path={`${this.props.match.url}/ipr`} component={IPR} />
        <Route exact path={`${this.props.match.url}/opr`} component={OPR} />
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
          exact
          path={`${this.props.match.url}/opr/viewOPR`}
          component={ViewOPR}
        />
        <Route
          exact
          path={`${this.props.match.url}/opr/viewOPR/updaterr`}
          component={UpdateRR}
        />
        <Route
          exact
          path={`${this.props.match.url}/opr/add`}
          component={AddEditOPR}
        />
        <Route
          exact
          path={`${this.props.match.url}/opr/viewOPR/add`}
          component={AddRadioOPR}
        />
        <Route
          path={`${this.props.match.url}/edr/viewEDR/TriageAndAssessment`}
          component={EDRTriageAndAssessment}
        />
        <Route
          path={`${this.props.match.url}/ipr/viewIPR/TriageAndAssessment`}
          component={IPRTriageAndAssessment}
        />
        {/* <Route
          exact
          path={`${this.props.match.url}/services`}
          component={ServiceMgmt}
        />
        <Route
          path={`${this.props.match.url}/services/radiology`}
          component={RadiologyRoutes}
        />
        <Route path={`${this.props.match.url}/edr`} component={EmergencyDR} />
        <Route
          path={`${this.props.match.url}/patientListing`}
          component={PatientListingRoutes}
        />
        <Route
          path={`${this.props.match.url}/services/laboratory`}
          component={LaboratoryRoutes}
        />
        <Route
          path={`${this.props.match.url}/services/surgery`}
          component={SurgeryRoutes}
        /> */}

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />

        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default WMSRoutes
