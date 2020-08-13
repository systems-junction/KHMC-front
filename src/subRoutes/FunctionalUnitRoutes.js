import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditFunctionalUnit from "../views/FunctionalUnit/addEditFunctionalUnit.jsx";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";
import ReplenishmentRoutesForFU from "./replenishmentRoutesForFU";

import ProfessionalOrderForMedicinal from "./professionalOrderForMedicinal";
import ProfessionalOrderForNonMedical from "./professionalOrderForNonMedical";
import FunctionalUnit from "../views/FunctionalUnit/functionalUnit";
import FU from "../views/Home/FU";
import FuInventoryRoutes from "./fuInventory";
import ReturnItemsForFUInventory from "../views/ReplenishmentRequestForFU/addEditInternalReturnRequestForFUInventory";
import RequestReturnTable from "../views/internalReturnRequest/internalReturnRequestTable";
import ReceiveItemsForFUInventory from "../views/ReplenishmentRequestForFU/handleReceiveItemForFUInventory";

class FunctionUnitRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={FU} />

        {/* <Route
          exact
          path={`${this.props.match.url}/add`}
          component={AddEditFunctionalUnit}
        />

        <Route
          exact
          path={`${this.props.match.url}/edit`}
          component={AddEditFunctionalUnit}
        /> */}

        {/* <Route exact path={`${this.props.match.url}/:fuName`} component={FU} /> */}

        <Route
          path={`${this.props.match.url}/medicinalorder`}
          component={ProfessionalOrderForMedicinal}
        />

        <Route
          path={`${this.props.match.url}/professionalorder`}
          component={ProfessionalOrderForNonMedical}
        />

        <Route
          path={`${this.props.match.url}/fuinventory`}
          component={FuInventoryRoutes}
        />

        <Route
          path={`${this.props.match.url}/replenishment`}
          component={ReplenishmentRoutesForFU}
        />

        <Route
          path={`${this.props.match.url}/receive/returnitems`}
          // component={returnItemsForFUInventory}
          component={(props) => (
            <ReturnItemsForFUInventory {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/receive/add`}
          // component={ReceiveItemsForFUInventory}
          component={(props) => (
            <ReceiveItemsForFUInventory {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/receive`}
          component={ReplenishmentRoutesForFU}
        />

        <Route
          path={`${this.props.match.url}/returnitems/edit`}
          // component={requestReturnTable}
          component={(props) => (
            <ReturnItemsForFUInventory {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/returnitems/view`}
          // component={requestReturnTable}
          component={(props) => (
            <ReturnItemsForFUInventory {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/returnitems`}
          // component={requestReturnTable}
          component={(props) => (
            <RequestReturnTable {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default FunctionUnitRoutes;
