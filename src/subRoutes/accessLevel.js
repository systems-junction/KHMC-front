/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditAccessLevel from "../views/UserManagement/accessLevel/addEditAccessLevel";

class ReceiveItemsRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditAccessLevel}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditAccessLevel}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ReceiveItemsRoutes;
