/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditStaff from "../views/UserManagement/staff/addEditStaff";
import staff from "../views/UserManagement/staff/staff";

class ReceiveItemsRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={staff} />
        <Route path={`${this.props.match.url}/add`} component={AddEditStaff} />
        <Route path={`${this.props.match.url}/edit`} component={AddEditStaff} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ReceiveItemsRoutes;
