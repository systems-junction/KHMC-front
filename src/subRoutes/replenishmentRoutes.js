import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import replenishmentRequest from "../views/ReplenishmentRequest/replenishmentRequest";
import addEditReplenishmentRequest from "../views/ReplenishmentRequest/addEditReplenishmentRequest";
import SuccessScreen from '../components/SuccessScreen/SuccessScreen';


class ItemRoutes extends React.Component {
  render() {
    console.log("rednere items", this.props.match);
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={replenishmentRequest} />

        <Route path={`${this.props.match.url}/add`} component={addEditReplenishmentRequest} />

        <Route path={`${this.props.match.url}/edit`} component={addEditReplenishmentRequest} />

        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ItemRoutes;
