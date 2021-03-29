import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import Reports from "../views/Home/Reports/Reports";

import WarehouseReports from "../views/Home/Reports/WarehouseReports";
import FUReports from "../views/Home/Reports/FUReports";
import POTracking from "../views/Reports/POTracking/poTracking";
import StockLevels from "../views/Reports/StockLevels/stockLevels";
import ItemsBalance from "../views/Reports/ItemsBalance/itemsBalance";
import SupplierFulfillmentPO from "../views/Reports/SupplierFulfillmentPO/supplierFulfillmentPO";
import ExpiredItems from "../views/Reports/ExpiredItems/expiredItems";
import NearlyExpiredItems from "../views/Reports/NearlyExpiredItems/nearlyExpiredItems";
import DisposedItems from "../views/Reports/DisposedItems/disposedItems";
import ConsumptionBalance from "../views/Reports/ConsumptionBalance/consumptionBalance";
import SlowMovingItems from "../views/Reports/SlowMovingItems/slowMovingItems";
import WarehouseTransfer from "../views/Reports/Warehouse Transfer/warehouseTransfer";

const PrivateRoute = ( { component: Component, ...rest } ) =>
{
  const [ currentUser, setCurrentUser ] = React.useState(
    cookie.load( "current_user" )
  );

  return (
    <Route
      { ...rest }
      render={ ( props ) =>
        currentUser.staffTypeId.type === "admin" ||
          currentUser.staffTypeId.type === "Committe Member" ||
          currentUser.staffTypeId.type === "Accounts Member" ||
          currentUser.staffTypeId.type === "Warehouse Member" ? (
          <Component { ...props } />
        ) : (
          <Redirect to="notfound" />
        )
      }
    />
  );
};

class ControlRoomRoutes extends React.PureComponent
{
  render ()
  {
    return (
      <Switch>
        <Route exact path={ `${ this.props.match.url }` } component={ Reports } />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports` }
          component={ WarehouseReports }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/others` }
          component={ WarehouseReports }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/potracking` }
          component={ POTracking }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/stocklevels` }
          component={ StockLevels }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/expireditems` }
          component={ ExpiredItems }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/nearlyexpireditems` }
          component={ NearlyExpiredItems }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/itemsbalance` }
          component={ ItemsBalance }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/supplierfullfillment` }
          component={ SupplierFulfillmentPO }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/disposed` }
          component={ DisposedItems }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/others/consumptionbalance` }
          component={ ConsumptionBalance }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/others/slowmovingitems` }
          component={ SlowMovingItems }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/warehousereports/others/whtransfer` }
          component={ WarehouseTransfer }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/fureports` }
          component={ FUReports }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/fureports/others` }
          component={ FUReports }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/fureports/stocklevels` }
          component={ StockLevels }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/fureports/itemsbalance` }
          component={ ItemsBalance }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/fureports/expireditems` }
          component={ ExpiredItems }
        />
        <Route
          exact
          path={ `${ this.props.match.url }/fureports/nearlyexpireditems` }
          component={ NearlyExpiredItems }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/fureports/disposed` }
          component={ DisposedItems }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/fureports/consumptionbalance` }
          component={ ConsumptionBalance }
        />

        <Route
          exact
          path={ `${ this.props.match.url }/fureports/slowmovingitems` }
          component={ SlowMovingItems }
        />

        {/* <PrivateRoute
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
        /> */}
        <Route path={ `${ this.props.match.url }/notfound` } component={ NotFound } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default ControlRoomRoutes;
