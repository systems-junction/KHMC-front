import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import NotFound from '../components/NotFound/NotFound';
import HomeScreen from '../views/Home/HomeScreen';

import ControlRoom from '../views/Home/ControlRoom';

import WMS from '../views/Home/WMS';

import BusinessUnitRoutes from '../subRoutes/business_unit';
import FunctionalUnitRoutes from '../subRoutes/FunctionalUnitRoutes';
import Vendor from '../subRoutes/vendor';

import ItemRoutes from '../subRoutes/items';


class ControlRoomRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={ControlRoom} />
       
        <Route exact path={`${this.props.match.url}/wms`} component={WMS} />

        <Route
          path={`${this.props.match.url}/wms/bus`}
          component={BusinessUnitRoutes}
        />

        <Route path={`${this.props.match.url}/wms/vendor`} component={Vendor} />
      
        <Route
          path={`${this.props.match.url}/wms/fus`}
          component={FunctionalUnitRoutes}
        />

<Route
          path={`${this.props.match.url}/wms/items`}
          component={ItemRoutes}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ControlRoomRoutes;
