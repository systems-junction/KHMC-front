import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddItems from "../views/Items/AddItems.js";
import Items from "../views/Items/Items";
import SuccessScreen from '../components/SuccessScreen/SuccessScreen';


class ItemRoutes extends React.Component {
  render() {
    console.log("rednere items", this.props.match);
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={Items} />

        <Route path={`${this.props.match.url}/add`} component={AddItems} />

        <Route path={`${this.props.match.url}/edit`} component={AddItems} />

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
