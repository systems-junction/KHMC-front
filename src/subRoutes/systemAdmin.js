/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddEditSystemAdmin from '../views/UserManagement/systemAdmin/addEditSystemAdmin';

class SystemAdminRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditSystemAdmin}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditSystemAdmin}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default SystemAdminRoutes;
