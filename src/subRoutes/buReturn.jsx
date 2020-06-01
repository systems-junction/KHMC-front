/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditBuReturn from '../views/BuReturn/addEditBuReturn';

class BuReturn extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditBuReturn} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditBuReturn} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default BuReturn