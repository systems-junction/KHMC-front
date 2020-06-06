import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddBusinessUnit from '../views/BusinessUnit/AddBusinessUnit';

import SuccessScreen from '../components/SuccessScreen/SuccessScreen';

import BusinessUnit from '../views/BusinessUnit/BusinessUnit';

class BusinessUnitRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={BusinessUnit}
        />

        <Route
          
          path={`${this.props.match.url}/add`}
          component={AddBusinessUnit}
        />

        <Route
          path={`${this.props.match.url}/edit`}
          component={AddBusinessUnit}
        />

        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default BusinessUnitRoutes;
