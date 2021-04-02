import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import blockChainReports from "../views/Home/Reports/BlockChainReports";
import RCM from "../views/Home/Reports/RCM";
import WMS from "../views/Home/Reports/WMS";
import Admin from "../views/Home/Reports/Admin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );
};

class BlockChainRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={blockChainReports}
        />

        <Route exact path={`${this.props.match.url}/rcm`} component={RCM} />
        <Route exact path={`${this.props.match.url}/wms`} component={WMS} />
        <Route exact path={`${this.props.match.url}/admin`} component={Admin} />

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default BlockChainRoutes;
