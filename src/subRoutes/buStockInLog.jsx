/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditBuStockInLog from '../views/BuStockInLog/addEditBuStockInLog';

class BuStockInLog extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditBuStockInLog} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditBuStockInLog} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default BuStockInLog