/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditPurchaseOrders from "../views/PurchaseOrders/addEditPurchaseOrders";

import purchaseOrder from "../views/PurchaseOrders/purchaseOrder";

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={purchaseOrder}
        />

        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditPurchaseOrders}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditPurchaseOrders}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PurchaseRequest;
