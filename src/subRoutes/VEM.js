/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import vem from '../views/VEM/vem'
import totalRates from "../views/VEM/vemTotalRates";

class VEM extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={vem} />

        <Route
          path={`${this.props.match.url}/totalRates`}
          component={totalRates}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default VEM;
