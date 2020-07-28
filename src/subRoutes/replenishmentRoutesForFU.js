import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import ReplenishmentRequest from "../views/ReplenishmentRequestForFU/replenishmentRequest";
import AddEditReplenishmentRequest from "../views/ReplenishmentRequestForFU/addEditReplenishmentRequest";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

class ItemRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          // component={replenishmentRequest}
          component={(props) => (
            <ReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/add`}
          // component={addEditReplenishmentRequest}
          component={(props) => (
            <AddEditReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/edit`}
          // component={addEditReplenishmentRequest}
          component={(props) => (
            <AddEditReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        {/* <Route
          path={`${this.props.match.url}/receive`}
          // component={receiveItemsForFUInventory}
          component={(props) => (
            <ReceiveItemsForFUInventory {...props} match={this.props.match} />
          )}
        /> */}

     

        <Route
          path={`${this.props.match.url}/success`}
          // component={SuccessScreen}
          component={(props) => (
            <SuccessScreen {...props} match={this.props.match} />
          )}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ItemRoutes;
