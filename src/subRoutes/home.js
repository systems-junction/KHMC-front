import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import PhotoEditor from "../components/PhotoEditor/PhotoEditor";
// import CareStreamMain from "../views/CareStream/CareStreamMain";
import HomeScreen from "../views/Home/HomeScreen";
import PatientFHIR from "../views/patientFHIR/patientFHIR";
import ControlRoom from "../views/Home/ControlRoom";
import WMS from "../views/Home/WMS";
import BusinessUnitRoutes from "../subRoutes/business_unit";
import ControlRoomRoutes from "../subRoutes/controlRoom";
import ReportsRoutes from "../subRoutes/ReportsRoutes";
import WMSRoutes from "../subRoutes/wms";
import RCMRoutes from "../subRoutes/rcmRoutes";
import FINRoutes from "../subRoutes/finRoutes";
import PatientListingRoutes from "./patientListing";
import PurchaseRequest from "../views/PurchaseRequest/purchaseRequest";
import AddEditPurchaseRequest from "../views/PurchaseRequest/addEditPurchaseRequest";
import PurchaseOrders from "../views/PurchaseOrders/purchaseOrder";
import AddEditPurchaseOrders from "../views/PurchaseOrders/addEditPurchaseOrders";
import BuReturn from "../views/BuReturn/buReturn";
import AddEditBuReturn from "../views/BuReturn/addEditBuReturn";
// import PrintCareStream from "../views/CareStream/Steps/PrintCareStream";

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
import notificationCenter from "../views/Notifications/notifications";
import dashboard from "../views/Dashboard/dashboard";

import WMSAllUsers from "../views/Home/WMSAllUsers";
import RCMAllUsers from "../views/Home/RCMAllUsers";
import SingleUserHome from "../views/Home/singleUserHome";

import webRTC from "../views/WebRTC/webRTC";

const hist = createBrowserHistory();
class HomeScreenRoutes extends React.PureComponent
{
  render ()
  {
    return (
      <Switch>
        <Route exact path={ "/home" } component={ HomeScreen } />

        <Route exact path={ "/home/allwmsusers" } component={ WMSAllUsers } />
        <Route exact path={ "/home/allrcmusers" } component={ RCMAllUsers } />

        <Route
          exact
          path={ "/home/allrcmusers/others" }
          component={ RCMAllUsers }
        />

        <Route
          exact
          path={ "/home/allwmsusers/singleuser" }
          component={ SingleUserHome }
        />

        <Route exact path={ "/home/dashboard" } component={ dashboard } />
        <Route exact path={ "/home/webRTC" } component={ webRTC } />
        <Route exact path={ "/home/photoEditor" } component={ PhotoEditor } />
        <Route exact path={ "/home/patientFHIR" } component={ PatientFHIR } />
        <Route path={ "/home/controlroom" } component={ ControlRoomRoutes } />
        <Route path={ "/home/reports" } component={ ReportsRoutes } />
        {/* <Route exact path={"/home/careStream"} component={CareStreamMain} /> */ }
        {/* <Route
          path={"/home/careStream/printCareStream"}
          component={PrintCareStream}
        /> */}

        <Route
          path={ "/home/notificationCenter" }
          component={ notificationCenter }
        />
        <Route path={ "/home/wms" } component={ WMSRoutes } />
        <Route path={ "/home/rcm" } component={ RCMRoutes } />
        <Route path={ "/home/fin" } component={ FINRoutes } />
        <Route exact path={ "/home/bureturn" } component={ BuReturn } />
        <Route path={ "/home/bureturn/add" } component={ AddEditBuReturn } />
        <Route path={ "/home/bureturn/edit" } component={ AddEditBuReturn } />
        <Route exact path={ "/home/bustockinlog" } component={ BuStockInLog } />
        <Route
          path={ "/home/bustockinlog/add" }
          component={ AddEditBuStockInLog }
        />
        <Route
          path={ "/home/bustockinlog/edit" }
          component={ AddEditBuStockInLog }
        />
        <Route exact path={ "/home/bustockoutlog" } component={ BuStockOutLog } />
        <Route
          path={ "/home/bustockoutlog/add" }
          component={ AddEditBuStockOutLog }
        />
        <Route
          path={ "/home/bustockoutlog/edit" }
          component={ AddEditBuStockOutLog }
        />
        <Route exact path={ "/home/typestaff" } component={ StaffTypes } />
        <Route path={ "/home/typestaff/add" } component={ AddEditStaffTypes } />
        <Route path={ "/home/typestaff/edit" } component={ AddEditStaffTypes } />
        <Route exact path={ "/home/accesslevel" } component={ AccessLevel } />
        <Route path={ "/home/accesslevel/add" } component={ AddEditAccessLevel } />
        <Route path={ "/home/accesslevel/edit" } component={ AddEditAccessLevel } />
        <Route exact path={ "/home/systemadmin" } component={ systemAdmin } />
        <Route path={ "/home/systemadmin/add" } component={ addEditSystemAdmin } />
        <Route path={ "/home/systemadmin/edit" } component={ addEditSystemAdmin } />
        {/* <Route exact path={'/home/controlroom/wms'} component={WMS} />
        <Route
          path={'/home/controlroom/wms/bus'}
          component={BusinessUnitRoutes}
        /> */}
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
export default HomeScreenRoutes;
