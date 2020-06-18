/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditMaterialReceiving from "../views/MaterialReceiving/addEditMaterialReceiving";
import materialreceiving from "../views/MaterialReceiving/materialreceiving";
import viewPO from "../views/MaterialReceiving/viewPO";

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={materialreceiving}
        />

        <Route
          exact
          path={`${this.props.match.url}/viewpo`}
          component={viewPO}
        />

        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditMaterialReceiving}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditMaterialReceiving}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PurchaseRequest;
