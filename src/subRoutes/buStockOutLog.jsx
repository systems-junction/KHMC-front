/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditBuStockOutLog from '../views/BuStockOutLog/addEditStockOutLog';

class BuStockOutLog extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditBuStockOutLog} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditBuStockOutLog} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default BuStockOutLog