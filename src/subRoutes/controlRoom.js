import React from 'react'
import cookie from 'react-cookies'
import { Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFound from '../components/NotFound/NotFound'
import HomeScreen from '../views/Home/HomeScreen'
import ControlRoom from '../views/Home/ControlRoom'
import WMS2 from '../views/Home/WMS2'
import BusinessUnitRoutes from '../subRoutes/business_unit'
import FunctionalUnitRoutes from '../subRoutes/FunctionalUnitRoutes'
import Vendor from '../subRoutes/vendor'
import ItemRoutes from '../subRoutes/items'
import ItemsRoutes from '../subRoutes/items'
import PurchaseOrderRoutes from '../subRoutes/purchaseOrders'
import PurchaseRequestRoutes from '../subRoutes/purchaseRequest'
import WarehouseInventoryRoutes from '../subRoutes/warehouseInventory'
import StaffRoutes from '../subRoutes/staff'
import BuInventoryRoutes from './buInventory'
import ReplenishmentRoutesForFU from './replenishmentRoutesForFU'
import ReplenishmentRoutesForBU from './professionalOrderForMedicinal'
import ProfessionalOrderForNonMedical from './professionalOrderForNonMedical'
import MaterialReceivingRoutes from './materialReceiving'
import ReceiveRequestsRoutes from './receiveRequests'
import RCMRoutes from './rcm'
import FUMgmtRoutes from './fuMgmtRoutes'
import vem from './VEM'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load('current_user')
  )

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.staffTypeId.type === 'admin' ||
        currentUser.staffTypeId.type === 'Committe Member' ||
        currentUser.staffTypeId.type === 'Accounts Member' ||
        currentUser.staffTypeId.type === 'Warehouse Member' ? (
          <Component {...props} />
        ) : (
          <Redirect to='notfound' />
        )
      }
    />
  )
}

class ControlRoomRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={ControlRoom} />
        <Route path={`${this.props.match.url}/vem`} component={vem} />
        
        <Route exact path={`${this.props.match.url}/wms`} component={WMS2} />
        <Route path={`${this.props.match.url}/rcm`} component={RCMRoutes} />
        <PrivateRoute
          path={`${this.props.match.url}/staff`}
          component={StaffRoutes}
        />
        {/* <Route
          path={`${this.props.match.url}/fus/replenishment`}
          component={ReplenishmentRoutesForFU}
        /> */}

        <Route
          path={`${this.props.match.url}/bus/replenishment`}
          component={ReplenishmentRoutesForBU}
        />

        <Route
          path={`${this.props.match.url}/bus/professionalorder`}
          component={ProfessionalOrderForNonMedical}
        />

        <Route
          path={`${this.props.match.url}/bus`}
          component={BusinessUnitRoutes}
        />

        <Route path={`${this.props.match.url}/fus`} component={FUMgmtRoutes} />

        <Route
          path={`${this.props.match.url}/buinventory`}
          component={BuInventoryRoutes}
        />

        {/* <Route
          path={`${this.props.match.url}/wms/replenishment`}
          component={ReplenishmentRoutesForFU}
        /> */}

        <PrivateRoute
          path={`${this.props.match.url}/wms/vendor`}
          component={Vendor}
        />

        <PrivateRoute
          path={`${this.props.match.url}/wms/items`}
          component={ItemsRoutes}
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

        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default ControlRoomRoutes
