import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import LR from "../views/ServicesRequest/LR/LR";
import EDR from "../views/ServicesRequest/LR/EDR";
import IPR from "../views/ServicesRequest/LR/IPR";
import OPR from "../views/ServicesRequest/LR/OPR";
import ViewIPR from "../views/ServicesRequest/LR/viewIPR";
import ViewEDR from "../views/ServicesRequest/LR/viewEDR";
import ViewOPR from "../views/ServicesRequest/LR/viewOPR";
import UpdateLR from "../views/ServicesRequest/LR/updateLR";
import EDRTriageAndAssessment from "../views/ServicesRequest/PHR/EDRTriageAndAssessment";
import IPRTriageAndAssessment from "../views/ServicesRequest/PHR/IPRTriageAndAssessment";
// import AddEditOPR from "../views/ServicesRequest/LR/addEditOPR";
import AddEditOPR from "../components/PatientRegistration/PatientRegistration";
import AddPharmacyOPR from "../views/ServicesRequest/LR/addLab";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

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

        <Route exact path={`${this.props.match.url}`} component={LR} />
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
          path={`${this.props.match.url}/ipr/success`}
          component={SuccessScreen}
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
          path={`${this.props.match.url}/opr/viewOPR/updatelr`}
          component={UpdateLR}
        />
        <Route
          exact
          path={`${this.props.match.url}/opr/viewOPR/success`}
          component={SuccessScreen}
        />
        <Route
          exact
          path={`${this.props.match.url}/opr/viewOPR/success`}
          component={SuccessScreen}
        />

        <Route
          exact
          path={`${this.props.match.url}/opr/add`}
          component={AddEditOPR}
        />

        <Route
          exact
          path={`${this.props.match.url}/opr/success`}
          component={SuccessScreen}
        />
        <Route
          exact
          path={`${this.props.match.url}/opr/viewOPR/add`}
          component={AddPharmacyOPR}
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

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default WMSRoutes;
