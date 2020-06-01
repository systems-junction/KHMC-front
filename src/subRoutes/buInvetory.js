/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditBuInventory from '../views/BuInventory/addEditBuInventory'

class BuInventory extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditBuInventory} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditBuInventory} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default BuInventory