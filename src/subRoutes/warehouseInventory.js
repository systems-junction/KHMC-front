import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import AddEditWareHouseInventory from "../views/WareHouseInventory/addEditWareHouseInventory.jsx";
import wareHouseInventory from "../views/WareHouseInventory/wareHouseInventory";

class WareHouseInventoryRoutes extends React.Component {
  render() {
    console.log("rednere items", this.props.match);
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={wareHouseInventory}
        />
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditWareHouseInventory}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditWareHouseInventory}
        />

        <Route path="*" component={NotFound} />

        {/* <Route exact path="/" component={Login} />
                    <Route exact path="*" component={NotFound} /> */}
        {/* <Route path="/rtl" component={RTL} /> */}
        {/* <Redirect from="/" to="/admin" /> */}
      </Switch>
    );
  }
}

export default WareHouseInventoryRoutes;
