/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditFuInventory from "../views/FuInventory/addEditFuInventory";
import FuInventory from "../views/FuInventory/fuInventory";

class BuInventory extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          // component={FuInventory}
          component={(props) => (
            <FuInventory {...props} match={this.props.match} />
          )}
        />

        <Route
          path={`${this.props.match.url}/add`}
          // component={AddEditFuInventory}
          component={(props) => (
            <AddEditFuInventory {...props} match={this.props.match} />
          )}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          // component={AddEditFuInventory}
          component={(props) => (
            <AddEditFuInventory {...props} match={this.props.match} />
          )}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default BuInventory;
