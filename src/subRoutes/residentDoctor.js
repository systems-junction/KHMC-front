import React from 'react'
import cookie from 'react-cookies'
import { Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFound from '../components/NotFound/NotFound'
import ResidentDoctor from '../views/ResidentDoctor/ResidentDoctor'
import EDR from '../views/ResidentDoctor/EDR/EDR'
import ViewEDR from '../views/ResidentDoctor/EDR/viewEDR'
import DischargeRequest from '../views/ResidentDoctor/EDR/DischargeRequest'
import AddDischargeMed from '../views/ResidentDoctor/EDR/addDischargeMed'
import AddEDR from '../views/ResidentDoctor/EDR/addEditEDR'
import EDRTriageAndAssessment from '../views/ResidentDoctor/EDR/TriageAndAssessment'
import IPR from '../views/ResidentDoctor/IPR/IPR'
import LabRadRequest from '../views/ResidentDoctor/LabRadRequest/labRadRequest'
import viewReport from '../views/ResidentDoctor/LabRadRequest/viewLabRadReport'
import AssessmentAndDiagnosis from '../views/ResidentDoctor/AssessmentAndDiagnosis/AssessmentAndDiagnosis'
import triageAssessment from '../views/ResidentDoctor/LabRadRequest/TriageAndAssessment'
import ADtriageAssessment from '../views/ResidentDoctor/AssessmentAndDiagnosis/TriageAndAssessment'
import Discharge from '../views/ResidentDoctor/Discharge/DischargeRequest'
import AddDischargeMedication from '../views/ResidentDoctor/Discharge/addDischargeMed'
import ViewIPR from '../views/ResidentDoctor/IPR/viewIPR'
import iprDischargeRequest from '../views/ResidentDoctor/IPR/DischargeRequest'
import iprAddDischargeMed from '../views/ResidentDoctor/IPR/addDischargeMed'
import addViewFollowUp from '../views/ResidentDoctor/IPR/addViewFollowUp'
import AddIPR from '../views/ResidentDoctor/IPR/addEditIPR'
import IPRTriageAndAssessment from '../views/ResidentDoctor/IPR/TriageAndAssessment'

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

        <Route
          exact
          path={`${this.props.match.url}`}
          component={ResidentDoctor}
        />
        <Route exact path={`${this.props.match.url}/edr`} component={EDR} />
        <Route exact path={`${this.props.match.url}/ipr`} component={IPR} />
        <Route
          exact
          path={`${this.props.match.url}/labradrequest`}
          component={LabRadRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/labradrequest/triageAssessment`}
          component={triageAssessment}
        />

        <Route
          exact
          path={`${this.props.match.url}/labradrequest/viewReport`}
          component={viewReport}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis`}
          component={AssessmentAndDiagnosis}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/triageAssessment`}
          component={ADtriageAssessment}
        />

        <Route
          exact
          path={`${this.props.match.url}/dischargerequest`}
          component={Discharge}
        />

        <Route
          exact
          path={`${this.props.match.url}/dischargerequest/addDischargeRequest`}
          component={AddDischargeMedication}
        />

        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/add`}
          component={AddIPR}
        />

        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/followUp`}
          component={addViewFollowUp}
        />

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
          path={`${this.props.match.url}/edr/viewEDR/add`}
          component={AddEDR}
        />

        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR/dischargerequest`}
          component={DischargeRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR/dischargerequest/addDischargeRequest`}
          component={AddDischargeMed}
        />
        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/dischargerequest`}
          component={iprDischargeRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/dischargerequest/addDischargeRequest`}
          component={iprAddDischargeMed}
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
