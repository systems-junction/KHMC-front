/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch } from "react-router-dom";

import New from '../New.js'
import NotFound from '../components/NotFound/NotFound'

import Login from '../layouts/Login'

class Dashboard extends React.PureComponent {

    render(){
        return(
            <Switch>
                <Route exact path={`${this.props.match.url}`} component={New} />
                <Route path={`${this.props.match.url}/furthur`} component={Login} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default Dashboard