import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import RCM from "../views/Home/RCMHome";
import ServicesRequestRoutes from "../subRoutes/servicesRequest";
import InsuranceClaimRoutes from "../subRoutes/insuranceClaim";
import ResidentDoctor from "../subRoutes/residentDoctor";
import ECR from "../subRoutes/ecr";
import PatientListingRoutes from "./patientListing";
// import PatientHistory from "../views/PatientHistory/PatientHistory";
import PatientHistory from "./patientHistory";
import patientAssessment from "./patientAssessment";
import patientCare from "./patientCare";
import Chat from "../components/Chat/Chat";
import LabRadRequest from "./labRadRequest";
import EDR from "./EDR";
import IPR from "./iprRoutes";
import PatientClearenceRoutes from "./patientClearenceRoutes";

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

        <Route exact path={`${this.props.match.url}`} component={RCM} />
        <Route path={"/home/rcm/sr"} component={ServicesRequestRoutes} />
        <Route path={"/home/rcm/rd"} component={ResidentDoctor} />
        <Route path={"/home/rcm/ecr"} component={ECR} />
        <Route path={"/home/rcm/patientHistory"} component={PatientHistory} />
        <Route path={"/home/rcm/chat"} component={Chat} />
        <Route path={`${this.props.match.url}/edr`} component={EDR} />
        <Route path={`${this.props.match.url}/ipr`} component={IPR} />
        <Route path={"/home/rcm/ic"} component={InsuranceClaimRoutes} />
        <Route
          path={`${this.props.match.url}/patientclearence`}
          component={PatientClearenceRoutes}
        />

        <Route
          path={`${this.props.match.url}/patientListing`}
          component={PatientListingRoutes}
        />
        <Route
          path={`/home/rcm/patientAssessment`}
          component={patientAssessment}
        />
        <Route path={`/home/rcm/patientCare`} component={patientCare} />
        <Route path={`/home/rcm/LabRadRequest`} component={LabRadRequest} />

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default WMSRoutes;
