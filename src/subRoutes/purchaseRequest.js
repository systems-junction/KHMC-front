/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch} from "react-router-dom";
import NotFound from '../components/NotFound/NotFound';
import AddEditPurchaseRequest from '../views/PurchaseRequest/addEditPurchaseRequest';

class PurchaseRequest extends React.PureComponent {
    render(){
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddEditPurchaseRequest} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditPurchaseRequest} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default PurchaseRequest;