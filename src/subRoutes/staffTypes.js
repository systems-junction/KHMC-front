/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddEditStaffTypes from '../views/UserManagement/staffType/addEditStaffTypes';

class StaffTypesRoutes extends React.PureComponent {
  render(){
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditStaffTypes}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditStaffTypes}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default StaffTypesRoutes;