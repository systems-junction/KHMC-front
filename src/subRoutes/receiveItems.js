/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddEditReceiveItems from '../views/ReceiveItems/addEditReceiveItems';

class ReceiveItemsRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditReceiveItems}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditReceiveItems}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default ReceiveItemsRoutes;
