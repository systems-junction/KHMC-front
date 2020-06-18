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

import BuStockOutLog from "../views/BuStockOutLog/buStockOutLog";
import AddEditBuStockOutLog from "../views/BuStockOutLog/addEditStockOutLog";

import staff from "../views/UserManagement/staff/staff";
import AddEditStaff from "../views/UserManagement/staff/addEditStaff";

import StaffTypes from "../views/UserManagement/staffType/staffTypes";
import AddEditStaffTypes from "../views/UserManagement/staffType/addEditStaffTypes";

import AccessLevel from "../views/UserManagement/accessLevel/accessLevel";
import AddEditAccessLevel from "../views/UserManagement/accessLevel/addEditAccessLevel";

import systemAdmin from "../views/UserManagement/systemAdmin/systemAdmin";
import addEditSystemAdmin from "../views/UserManagement/systemAdmin/addEditSystemAdmin";

const hist = createBrowserHistory();

class HomeScreenRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={"/home"} component={HomeScreen} />

        <Route path={"/home/controlroom"} component={ControlRoomRoutes} />

        <Route exact path={"/home/bureturn"} component={BuReturn} />
        <Route path={"/home/bureturn/add"} component={AddEditBuReturn} />
        <Route path={"/home/bureturn/edit"} component={AddEditBuReturn} />


        <Route exact path={"/home/bustockinlog"} component={BuStockInLog} />
        <Route
          path={"/home/bustockinlog/add"}
          component={AddEditBuStockInLog}
        />
        <Route
          path={"/home/bustockinlog/edit"}
          component={AddEditBuStockInLog}
        />

        <Route exact path={"/home/bustockoutlog"} component={BuStockOutLog} />
        <Route
          path={"/home/bustockoutlog/add"}
          component={AddEditBuStockOutLog}
        />
        <Route
          path={"/home/bustockoutlog/edit"}
          component={AddEditBuStockOutLog}
        />

        <Route exact path={"/home/typestaff"} component={StaffTypes} />
        <Route path={"/home/typestaff/add"} component={AddEditStaffTypes} />
        <Route path={"/home/typestaff/edit"} component={AddEditStaffTypes} />

        <Route exact path={"/home/accesslevel"} component={AccessLevel} />
        <Route path={"/home/accesslevel/add"} component={AddEditAccessLevel} />
        <Route path={"/home/accesslevel/edit"} component={AddEditAccessLevel} />

        <Route exact path={"/home/systemadmin"} component={systemAdmin} />
        <Route path={"/home/systemadmin/add"} component={addEditSystemAdmin} />
        <Route path={"/home/systemadmin/edit"} component={addEditSystemAdmin} />

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
