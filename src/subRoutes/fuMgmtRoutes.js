import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditFunctionalUnit from "../views/FunctionalUnit/addEditFunctionalUnit.jsx";
import FunctionalUnit from "../views/FunctionalUnit/functionalUnit";
import AddEditFuInventory from "../views/FuInventory/addEditFuInventory";
import FuInventory from "../views/FuInventory/fuInventory";

import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

class FunctionUnitRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={FunctionalUnit}
        />

        <Route
          exact
          path={`${this.props.match.url}/add`}
          component={AddEditFunctionalUnit}
        />

        <Route
          exact
          path={`${this.props.match.url}/edit`}
          component={AddEditFunctionalUnit}
        />

        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />

        <Route
          path={`${this.props.match.url}/fuinventory/add/:id`}
          component={AddEditFuInventory}
        />

        <Route
          path={`${this.props.match.url}/fuinventory/edit/:id`}
          component={AddEditFuInventory}
        />

        <Route
          path={`${this.props.match.url}/fuinventory/:id`}
          component={FuInventory}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default FunctionUnitRoutes;
