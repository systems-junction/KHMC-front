import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import routes from 'routes.js';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import logo from 'assets/companyLogo/reactlogo.png';
import Sidebar from '../components/Sidebar/Sidebar.js';
import { warehouseName, backgroundColorForActiveSideNavTab } from '../config';
import New from '../New.js';
import NotFound from '../components/NotFound/NotFound.js';

import DashboardRoutes from '../subRoutes/dashboard.js';
import ItemsRoutes from '../subRoutes/items';
import BusinessUnitRoutes from '../subRoutes/business_unit.js';
import BuInventoryRoutes from '../subRoutes/buInvetory';
import BuRepRequestRoutes from '../subRoutes/buRepRequest';
import BuRepRequestDetailsRoutes from '../subRoutes/buRepRequestDetails';
import BuReturnRoutes from '../subRoutes/buReturn';
import BuStockInLogRoutes from '../subRoutes/buStockInLog';
import BuStockOutLogRoutes from '../subRoutes/buStockOutLog';
import FunctionalUnitRoutes from '../subRoutes/FunctionalUnitRoutes';
import VendorRoutes from '../subRoutes/vendor';
import WareHouseInventoryRoutes from '../subRoutes/warehouseInventory.js';
import PurchaseRequestRoutes from '../subRoutes/purchaseRequest';

import PurchaseOrdersRoutes from '../subRoutes/purchaseOrders';

import ReceiveItemsRoutes from '../subRoutes/receiveItems';
import MaterialReceivingRoutes from '../subRoutes/materialReceiving';

import StaffTypesRoutes from '../subRoutes/staffTypes';
import StaffRoutes from '../subRoutes/staff';
import SystemAdminRoutes from '../subRoutes/systemAdmin';





let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
      
    <Route path="/admin/dashboard/next" component={DashboardRoutes} />
    <Route path="/admin/items/next" component={ItemsRoutes} />
    <Route path="/admin/businessunit/next" component={BusinessUnitRoutes} />
    <Route path="/admin/buinventory/next" component={BuInventoryRoutes} />
    <Route path="/admin/bureprequest/next" component={BuRepRequestRoutes} />
    <Route
      path="/admin/detailsBuRepRequest/next"
      component={BuRepRequestDetailsRoutes}
    />
    <Route path="/admin/bureturn/next" component={BuReturnRoutes} />
    <Route path="/admin/bustockinlog/next" component={BuStockInLogRoutes} />
    <Route path="/admin/bustockoutlog/next" component={BuStockOutLogRoutes} />
    <Route path="/admin/functionalunit/next" component={FunctionalUnitRoutes} />
    <Route path="/admin/vendor/next" component={VendorRoutes} />
    <Route
      path="/admin/warehouseinventory/next"
      component={WareHouseInventoryRoutes}
    />
    <Route
      path="/admin/purchaserequest/next"
      component={PurchaseRequestRoutes}
    />

    <Route path="/admin/purchaseorders/next" component={PurchaseOrdersRoutes} />
    <Route path="/admin/receiveitems/next" component={ReceiveItemsRoutes} />
    <Route path="/admin/materialreceiving/next" component={MaterialReceivingRoutes} />
    <Route path="/admin/typestaff/next" component={StaffTypesRoutes} />
    <Route path="/admin/staff/next" component={StaffRoutes} />
    <Route path="/admin/systemadmin/next" component={SystemAdminRoutes} />
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  // const [image, setImage] = React.useState(bgImage);
  // const [color, setColor] = React.useState(colorForNavBar);
  const [fixedClasses, setFixedClasses] = React.useState('dropdown show');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleImageClick = image => {
  //   setImage(image);
  // };

  // const handleColorClick = color => {
  //   setColor(color);
  // };

  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show');
    } else {
      setFixedClasses('dropdown');
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={warehouseName}
        logo={logo}
        // image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        // color={color}
        color={backgroundColorForActiveSideNavTab}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}

        {getRoute() ? <Footer /> : null}

        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
