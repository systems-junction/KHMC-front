import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import ECR from "../views/ECR/ECRMenu";
import EDR from "../views/ECR/EcrEDR";
import IPR from "../views/ECR/EcrIPR";
import CN from "../views/PatientAssessmentCareLabRad/PatientAssessmentCareLabRad";
import ViewReport from "../components/ViewLabRadReport/ViewLabRadReport";
import PatientHistory from "../views/PatientHistory/PatientHistory";
import ViewEDR from "../views/ECR/viewEcrEDR";
import ViewIPR from "../views/ECR/viewEcrIPR";
import AddIPR from "../views/ECR/addIPR";
import AddEDR from "../views/ECR/addEDR";

// import TriageAndAssessmentEDR from '../views/ECR/TriageAndAssessmentEDR'
// import TriageAndAssessmentIPR from '../views/ECR/TriageAndAssessmentIPR'
import TriageAndAssessment from "../views/TriageAndAssessment/TriageAndAssessment";
import ViewConsultationNotes from "../views/ECR/viewConsultationNotes";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";
import ViewSingleTriage from "../views/TriageAndAssessment/ViewSingleTriage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.staffTypeId.type === "admin" ||
        currentUser.staffTypeId.type === "Committe Member" ||
        currentUser.staffTypeId.type === "Accounts Member" ||
        currentUser.staffTypeId.type === "Warehouse Member" ? (
          <Component {...props} />
        ) : (
          <Redirect to="notfound" />
        )
      }
    />
  );
};
class WMSRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        {/* <PrivateRoute
          path={`${this.props.match.url}/staff`}
          component={StaffRoutes}
        /> */}
        <Route exact path={`${this.props.match.url}`} component={ECR} />
        <Route exact path={`${this.props.match.url}/edr`} component={EDR} />
        <Route exact path={`${this.props.match.url}/ipr`} component={IPR} />
        <Route exact path={`${this.props.match.url}/cn`} component={CN} />
        <Route
          exact
          path={`${this.props.match.url}/cn/viewReport`}
          component={ViewReport}
        />
        <Route
          exact
          path={`${this.props.match.url}/patienthistory/viewReport`}
          component={ViewReport}
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
        {/* <Route
          path={`${this.props.match.url}/edr/viewEDR/TriageAndAssessment`}
          component={TriageAndAssessmentEDR}
        /> */}
        {/* <Route
          path={`${this.props.match.url}/ipr/viewIPR/TriageAndAssessment`}
          component={TriageAndAssessmentIPR}
        /> */}
        <Route
          exact
          path={`${this.props.match.url}/cn/triageAndAssessment`} //for consultation Triage & Assesment
          component={TriageAndAssessment}
        />
        <Route
          exact
          path={`${this.props.match.url}/cn/triageAssessment/view`}
          component={ViewSingleTriage}
        />
        <Route
          exact
          path={`${this.props.match.url}/cn/patienthistory`} //for consultation Triage & Assesment
          component={PatientHistory}
        />

        <Route
          exact
          path={`${this.props.match.url}/cn/viewConsultationNotes`} //for consultation Triage & Assesment
          component={ViewConsultationNotes}
        />
        <Route
          exact
          path={`${this.props.match.url}/cn/success`}
          component={SuccessScreen}
        />
        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/add`}
          component={AddIPR}
        />
        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR/add`}
          component={AddEDR}
        />
        <Route
          exact
          path={`${this.props.match.url}/notfound`}
          component={NotFound}
        />
        <Route exact path="*" component={NotFound} />
      </Switch>
    );
  }
}
export default WMSRoutes;
