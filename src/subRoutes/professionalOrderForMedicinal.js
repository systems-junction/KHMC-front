import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import ReplenishmentRequest from "../views/ProfessionalOrderForMedical/replenishmentRequestForBU";
import AddEditReplenishmentRequest from "../views/ProfessionalOrderForMedical/addEditReplenishmentRequestForBU";
import ReceiveItemsForBUInventory from "../views/ProfessionalOrderForMedical/receiveItemsForMedicalOrder";
import EditRequestedItems from "../views/ProfessionalOrderForMedical/editRequestedItems";

import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

class ItemRoutes extends React.Component {
  render() {
    console.log("rednere items for medicinal", this.props.match);
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
          exact
          path={`${this.props.match.url}/view`}
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

        <Route
          path={`${this.props.match.url}/receive`}
          // component={receiveItemsForBUInventory}
          component={(props) => (
            <ReceiveItemsForBUInventory {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/success`}
          // component={SuccessScreen}
          component={(props) => (
            <SuccessScreen {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/requesteditem/edit`}
          // component={editRequestedItems}
          component={(props) => (
            <EditRequestedItems {...props} match={this.props.match} />
          )}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ItemRoutes;
