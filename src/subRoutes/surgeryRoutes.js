/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import addEditSurgeryService from "../views/RCM/ServiceManagement/SurgeryService/addEditSurgeryService";
import surgeryService from "../views/RCM/ServiceManagement/SurgeryService/surgeryService";

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={surgeryService}
        />
        <Route
          path={`${this.props.match.url}/add`}
          component={addEditSurgeryService}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={addEditSurgeryService}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PurchaseRequest;
