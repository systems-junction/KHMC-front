import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import HomeScreen from "../views/Home/HomeScreen";
import ControlRoom from "../views/Home/ControlRoom";
import WMS from "../views/Home/WMS";
import BusinessUnitRoutes from "./business_unit";
import FunctionalUnitRoutes from "./FunctionalUnitRoutes";
import FU from "../views/Home/FU";

import Vendor from "./vendor";
import ItemRoutes from "./items";
import ReceiveItemRoutes from "./receiveItems";
import PurchaseOrderRoutes from "./purchaseOrders";
import PurchaseRequestRoutes from "./purchaseRequest";
import WarehouseInventoryRoutes from "./warehouseInventory";
import StaffRoutes from "./staff";
import FuInventoryRoutes from "./fuInventory";
import ReplenishmentRoutesForFU from "./replenishmentRoutesForFU";
import ReplenishmentRoutesForBU from "./professionalOrderForMedicinal";

import MaterialReceivingRoutes from "./materialReceiving";
import ReceiveRequestsRoutes from "./receiveRequests";

import WareHouseMgmtRoutes from "./warehouseMgmt";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.staffTypeId.type === "admin" ||
        currentUser.staffTypeId.type === "Committe Member" ||
        currentUser.staffTypeId.type === "Accounts Member" ||
        currentUser.staffTypeId.type === "Warehouse Member" ? (
          <Component {...props} />
        ) : (
          <Redirect to="notfound" />
        )
      }
    />
  );
};

class WMSRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={WMS} />

        {/* <PrivateRoute
          path={`${this.props.match.url}/staff`}
          component={StaffRoutes}
        /> */}

        <Route
          path={`${this.props.match.url}/warehouse`}
          component={WareHouseMgmtRoutes}
        />

        <Route
          path={`${this.props.match.url}/fus`}
          component={FunctionalUnitRoutes}
        />

        {/* <Route
          path={`${this.props.match.url}/fus/replenishment`}
          component={ReplenishmentRoutesForFU}
        />

        <Route
          path={`${this.props.match.url}/bus/replenishment`}
          component={ReplenishmentRoutesForBU}
        />

        <Route
          path={`${this.props.match.url}/bus`}
          component={BusinessUnitRoutes}
        />

        <Route
          path={`${this.props.match.url}/fuinventory`}
          component={FuInventoryRoutes}
        />

        <Route
          path={`${this.props.match.url}/wms/replenishment`}
          component={ReplenishmentRoutesForFU}
        />

        <PrivateRoute
          path={`${this.props.match.url}/items`}
          component={ItemRoutes}
        />

        <PrivateRoute
          path={`${this.props.match.url}/vendor`}
          component={Vendor}
        />

        <PrivateRoute
          path={`${this.props.match.url}/receiveitems`}
          component={ReceiveItemRoutes}
        />

        <Route
          path={`${this.props.match.url}/po`}
          component={PurchaseOrderRoutes}
        />

        <Route
          path={`${this.props.match.url}/pr`}
          component={PurchaseRequestRoutes}
        />

        <Route
          path={`${this.props.match.url}/warehouseinventory`}
          component={WarehouseInventoryRoutes}
        />

        <Route
          path={`${this.props.match.url}/materialreceiving`}
          component={MaterialReceivingRoutes}
        />

        <Route
          path={`${this.props.match.url}/wms/receiverequests`}
          component={ReceiveRequestsRoutes}
        /> */}

        {/* <Route
          path={"/home/receiveitems/add"}
          component={AddEditReceiveItems}
        />
        <Route
          path={"/home/receiveitems/edit"}
          component={AddEditReceiveItems}
        /> */}

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default WMSRoutes;
