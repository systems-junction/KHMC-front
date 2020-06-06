import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddEditFunctionalUnit from '../views/FunctionalUnit/addEditFunctionalUnit.jsx';
import SuccessScreen from '../components/SuccessScreen/SuccessScreen';

import FunctionalUnit from '../views/FunctionalUnit/functionalUnit';

class FunctionUnitRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={FunctionalUnit}
        />

        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditFunctionalUnit}
        />

        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditFunctionalUnit}
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

export default FunctionUnitRoutes;
