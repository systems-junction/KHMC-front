import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import NotFound from "../components/NotFound/NotFound";
import HomeScreen from "../views/Home/HomeScreen";

import ControlRoom from "../views/Home/ControlRoom";

import WMS from "../views/Home/WMS";

import BusinessUnitRoutes from "../subRoutes/business_unit";

import ControlRoomRoutes from "../subRoutes/controlRoom";

import PurchaseRequest from "../views/PurchaseRequest/purchaseRequest";
import AddEditPurchaseRequest from "../views/PurchaseRequest/addEditPurchaseRequest";

import PurchaseOrders from "../views/PurchaseOrders/purchaseOrder";
import AddEditPurchaseOrders from "../views/PurchaseOrders/addEditPurchaseOrders";

import BuReturn from "../views/BuReturn/buReturn";
import AddEditBuReturn from "../views/BuReturn/addEditBuReturn";


import MaterialReceiving from "../views/MaterialReceiving/materialreceiving";
import AddEditMaterialReceiving from "../views/MaterialReceiving/addEditMaterialReceiving";


import BuStockInLog from "../views/BuStockInLog/buStockInLog";
import AddEditBuStockInLog from "../views/BuStockInLog/addEditBuStockInLog";


import ReceiveItems from "../views/ReceiveItems/receiveItems";
import AddEditReceiveItems from "../views/ReceiveItems/addEditReceiveItems";


import WareHouseInventory from "../views/WareHouseInventory/wareHouseInventory";
import AddEditWareHouseInventory from "../views/WareHouseInventory/addEditWareHouseInventory";

const hist = createBrowserHistory();

class HomeScreenRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={"/home"} component={HomeScreen} />

        <Route path={"/home/controlroom"} component={ControlRoomRoutes} />

        <Route exact path={"/home/pr"} component={PurchaseRequest} />
        <Route path={"/home/pr/add"} component={AddEditPurchaseRequest} />
        <Route path={"/home/pr/edit"} component={AddEditPurchaseRequest} />

        <Route exact path={"/home/po"} component={PurchaseOrders} />
        <Route path={"/home/po/add"} component={AddEditPurchaseOrders} />
        <Route path={"/home/po/edit"} component={AddEditPurchaseOrders} />

        <Route exact path={"/home/bureturn"} component={BuReturn} />
        <Route path={"/home/bureturn/add"} component={AddEditBuReturn} />
        <Route path={"/home/bureturn/edit"} component={AddEditBuReturn} />


        <Route exact path={"/home/materialreceiving"} component={MaterialReceiving} />
        <Route path={"/home/materialreceiving/add"} component={AddEditMaterialReceiving} />
        <Route path={"/home/materialreceiving/edit"} component={AddEditMaterialReceiving} />



        <Route exact path={"/home/bustockinlog"} component={BuStockInLog} />
        <Route path={"/home/bustockinlog/add"} component={AddEditBuStockInLog} />
        <Route path={"/home/bustockinlog/edit"} component={AddEditBuStockInLog} />

        <Route exact path={"/home/receiveitems"} component={ReceiveItems} />
        <Route path={"/home/receiveitems/add"} component={AddEditReceiveItems} />
        <Route path={"/home/receiveitems/edit"} component={AddEditReceiveItems} />


        <Route exact path={"/home/warehouseinventory"} component={WareHouseInventory} />
        <Route path={"/home/warehouseinventory/add"} component={AddEditWareHouseInventory} />
        <Route path={"/home/warehouseinventory/edit"} component={AddEditWareHouseInventory} />


        {/* <Route exact path={'/home/controlroom/wms'} component={WMS} />

        <Route
          path={'/home/controlroom/wms/bus'}
          component={BusinessUnitRoutes}
        /> */}

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default HomeScreenRoutes;
