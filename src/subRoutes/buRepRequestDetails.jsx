/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditBuRepRequestDetails from '../views/BuRepRequestDetails/addEditBuRepRequestDetails'

class BuRepRequestDetails extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditBuRepRequestDetails} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditBuRepRequestDetails} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default BuRepRequestDetails