/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditVendor from '../views/Vendor/addEditVendor';

class Vendor extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditVendor} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditVendor} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default Vendor