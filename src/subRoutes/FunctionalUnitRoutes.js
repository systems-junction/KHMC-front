import React from 'react'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddEditFunctionalUnit from '../views/FunctionalUnit/addEditFunctionalUnit.jsx'

class FunctionUnitRoutes extends React.Component {


    render() {
        console.log('rednere items', this.props.match)
        return (

            <Switch>
                {/* <Route exact path={`${this.props.match.url}`} component={New} /> */}
                <Route path={`${this.props.match.url}/add`} component={AddEditFunctionalUnit} />
                <Route path={`${this.props.match.url}/edit`} component={AddEditFunctionalUnit} />

                <Route path='*' component={NotFound} />


                {/* <Route exact path="/" component={Login} />
                    <Route exact path="*" component={NotFound} /> */}
                {/* <Route path="/rtl" component={RTL} /> */}
                {/* <Redirect from="/" to="/admin" /> */}

            </Switch>
        )
    }
}

export default FunctionUnitRoutes