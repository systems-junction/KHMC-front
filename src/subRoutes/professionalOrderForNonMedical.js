import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import ReplenishmentRequest from "../views/ProfessionalOrderForNonMedial/replenishmentRequestForBU";
import AddEditReplenishmentRequest from "../views/ProfessionalOrderForNonMedial/addEditReplenishmentRequestForBU";
import AddEditNonMedicalItem from "../views/ProfessionalOrderForNonMedial/addEditNonMedicalItem";
import ReceiveItemsForBUInventory from "../views/ProfessionalOrderForNonMedial/receiveItemsForBUInventory";
import EditRequestedItems from "../views/ProfessionalOrderForNonMedial/editRequestedItems";

import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

class ItemRoutes extends React.Component {
  render() {
    console.log("rednere items for non medicinal", this.props.match);
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={(props) => (
            <ReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          exact
          path={`${this.props.match.url}/addorder`}
          component={(props) => (
            <ReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          exact
          path={`${this.props.match.url}/addnonmedicalorder`}
          component={(props) => (
            <ReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          exact
          path={`${this.props.match.url}/addnonmedicalorder/add`}
          component={(props) => (
            <AddEditNonMedicalItem {...props} match={this.props.match} />
          )}
        />

        <Route
          exact
          path={`${this.props.match.url}/addnonmedicalorder/edit`}
          component={(props) => (
            <AddEditNonMedicalItem {...props} match={this.props.match} />
          )}
        />

        <Route
          exact
          path={`${this.props.match.url}/receiveorder`}
          component={(props) => (
            <ReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/add`}
          // component={AddEditReplenishmentRequest}
          component={(props) => (
            <AddEditReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/edit`}
          // component={AddEditReplenishmentRequest}
          component={(props) => (
            <AddEditReplenishmentRequest {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/receive`}
          // component={ReceiveItemsForBUInventory}
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
          // component={EditRequestedItems}
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
