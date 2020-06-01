import React from 'react'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddItems from '../views/Items/AddItems.js'

class Items extends React.Component {


    render() {
        console.log('rednere items', this.props.match)
        return (

            <Switch>
                {/* <Route exact path={`${this.props.match.url}`} component={New} /> */}
                <Route path={`${this.props.match.url}/add`} component={AddItems} />
                <Route path={`${this.props.match.url}/Edit`} component={AddItems} />

                <Route path='*' component={NotFound} />


                {/* <Route exact path="/" component={Login} />
                    <Route exact path="*" component={NotFound} /> */}
                {/* <Route path="/rtl" component={RTL} /> */}
                {/* <Redirect from="/" to="/admin" /> */}

            </Switch>
        )
    }
}

export default Items