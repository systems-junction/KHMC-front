/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddEditPurchaseOrders from '../views/PurchaseOrders/addEditPurchaseOrders';

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditPurchaseOrders}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditPurchaseOrders}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PurchaseRequest;
