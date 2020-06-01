/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import AddEditMaterialReceiving from '../views/MaterialReceiving/addEditMaterialReceiving';

class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/add`}
          component={AddEditMaterialReceiving}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={AddEditMaterialReceiving}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PurchaseRequest;
