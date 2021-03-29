import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import Reports from "../views/Home/Reports/Reports";

import blockChainReports from "../views/Home/Reports/BlockChainReports";
import PatientRegistration from '../views/Home/Reports/PatientRegistration';
import FUReports from "../views/Home/Reports/FUReports";
import POTracking from "../views/Reports/POTracking/poTracking";
import StockLevels from "../views/Reports/StockLevels/stockLevels";
import ItemsBalance from "../views/Reports/ItemsBalance/itemsBalance";
import SupplierFulfillmentPO from "../views/Reports/SupplierFulfillmentPO/supplierFulfillmentPO";
import ExpiredItems from "../views/Reports/ExpiredItems/expiredItems";
import NearlyExpiredItems from "../views/Reports/NearlyExpiredItems/nearlyExpiredItems";
import DisposedItems from "../views/Reports/DisposedItems/disposedItems";
import ConsumptionBalance from "../views/Reports/ConsumptionBalance/consumptionBalance";
import SlowMovingItems from "../views/Reports/SlowMovingItems/slowMovingItems";
import WarehouseTransfer from "../views/Reports/Warehouse Transfer/warehouseTransfer";

const PrivateRoute = ( { component: Component, ...rest } ) =>
{
    const [ currentUser, setCurrentUser ] = React.useState(
        cookie.load( "current_user" )
    );
};

class BlockChainRoutes extends React.PureComponent
{
    render ()
    {
        console.log( "this.props.match.url: ", this.props.match.url );
        return (
            <Switch>
                <Route exact path={ `${ this.props.match.url }` } component={ blockChainReports } />

                <Route
                    exact
                    path={ `${ this.props.match.url }/patientRegistration` }
                    component={ PatientRegistration }
                />
                {/* <Route
                    exact
                    path={ `${ this.props.match.url }/warehousereports/expireditems` }
                    component={ ExpiredItems }
                />
                <Route
                    exact
                    path={ `${ this.props.match.url }/warehousereports/nearlyexpireditems` }
                    component={ NearlyExpiredItems }
                /> */}

                <Route path={ `${ this.props.match.url }/notfound` } component={ NotFound } />
                <Route path="*" component={ NotFound } />
            </Switch>
        );
    }
}

export default BlockChainRoutes;
