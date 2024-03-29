import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import HandlePatientBilling from "../views/PatientClearence/handlePatientBilling";
import ViewClearedPatients from "../views/PatientClearence/viewClearedPatients";

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

        <Route
          exact
          path={`${this.props.match.url}`}
          component={HandlePatientBilling}
        />

        <Route
          exact
          path={`${this.props.match.url}/edit`}
          component={HandlePatientBilling}
        />

        <Route
          exact
          path={`${this.props.match.url}/view`}
          component={ViewClearedPatients}
        />

        <Route
          exact
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default WMSRoutes;
