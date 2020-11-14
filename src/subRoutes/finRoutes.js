import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import FIN from "../views/Home/FIN";
import setMargins from "../views/SetMargins/setMargins";
import ResidentDoctor from "../subRoutes/residentDoctor";
import ECR from "../subRoutes/ecr";

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

        <Route exact path={`${this.props.match.url}`} component={FIN} />
        <Route path={"/home/fin/margins"} component={setMargins} />
        <Route path={"/home/fin/rd"} component={ResidentDoctor} />
        <Route path={"/home/fin/ecr"} component={ECR} />

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default WMSRoutes;
