import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import replenishmentRequest from "../views/ReplenishmentRequestForBU/replenishmentRequestForBU";
import addEditReplenishmentRequest from "../views/ReplenishmentRequestForBU/addEditReplenishmentRequestForBU";
import receiveItemsForBUInventory from "../views/ReplenishmentRequestForBU/receiveItemsForBUInventory";
import editRequestedItems from "../views/ReplenishmentRequestForBU/editRequestedItems";

import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

class ItemRoutes extends React.Component {
  render() {
    console.log("rednere items", this.props.match);
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={replenishmentRequest}
        />

        <Route
          path={`${this.props.match.url}/add`}
          component={addEditReplenishmentRequest}
        />

        <Route
          path={`${this.props.match.url}/edit`}
          component={addEditReplenishmentRequest}
        />

        <Route
          path={`${this.props.match.url}/receive`}
          component={receiveItemsForBUInventory}
        />

        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />

        <Route
          path={`${this.props.match.url}/requesteditem/edit`}
          component={editRequestedItems}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ItemRoutes;
