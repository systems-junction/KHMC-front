import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import HomeScreen from "../views/Home/HomeScreen";
import ControlRoom from "../views/Home/ControlRoom";
import WMS from "../views/Home/WMS";
import BusinessUnitRoutes from "../subRoutes/business_unit";
import FunctionalUnitRoutes from "../subRoutes/FunctionalUnitRoutes";
import Vendor from "../subRoutes/vendor";
import ItemRoutes from "../subRoutes/items";
import ReceiveItemRoutes from "../subRoutes/receiveItems";
import PurchaseOrderRoutes from "../subRoutes/purchaseOrders";
import PurchaseRequestRoutes from "../subRoutes/purchaseRequest";
import WarehouseInventoryRoutes from "../subRoutes/warehouseInventory";
import StaffRoutes from "../subRoutes/staff";
import FuInventoryRoutes from "./fuInventory";
import ReplenishmentRoutes from "./replenishmentRoutes";
import MaterialReceivingRoutes from "./materialReceiving";
import ReceiveRequestsRoutes from "./receiveRequests";

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

class ControlRoomRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={ControlRoom} />
        <PrivateRoute
          exact
          path={`${this.props.match.url}/wms`}
          component={WMS}
        />

        <PrivateRoute
          path={`${this.props.match.url}/staff`}
          component={StaffRoutes}
        />

        <Route
          path={`${this.props.match.url}/bus`}
          component={BusinessUnitRoutes}
        />

        <Route
          path={`${this.props.match.url}/fus/replenishment`}
          component={ReplenishmentRoutes}
        />

        <Route
          path={`${this.props.match.url}/fus`}
          component={FunctionalUnitRoutes}
        />

        <Route
          path={`${this.props.match.url}/fuinventory`}
          component={FuInventoryRoutes}
        />

        <Route
          path={`${this.props.match.url}/wms/replenishment`}
          component={ReplenishmentRoutes}
        />

        <PrivateRoute
          path={`${this.props.match.url}/items`}
          component={ItemRoutes}
        />

        <PrivateRoute
          path={`${this.props.match.url}/wms/vendor`}
          component={Vendor}
        />

        <PrivateRoute
          path={`${this.props.match.url}/wms/receiveitems`}
          component={ReceiveItemRoutes}
        />

        <PrivateRoute
          path={`${this.props.match.url}/wms/po`}
          component={PurchaseOrderRoutes}
        />

        <PrivateRoute
          path={`${this.props.match.url}/wms/pr`}
          component={PurchaseRequestRoutes}
        />

        <PrivateRoute
          path={`${this.props.match.url}/wms/warehouseinventory`}
          component={WarehouseInventoryRoutes}
        />

        <Route
          path={`${this.props.match.url}/wms/materialreceiving`}
          component={MaterialReceivingRoutes}
        />

        <Route
          path={`${this.props.match.url}/wms/receiverequests`}
          component={ReceiveRequestsRoutes}
        />

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

export default ControlRoomRoutes;
