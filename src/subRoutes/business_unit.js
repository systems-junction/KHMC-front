import React from 'react'
import { Route, Switch} from "react-router-dom";
import NotFound from '../components/NotFound/NotFound'
import AddBusinessUnit from '../views/BusinessUnit/AddBusinessUnit'

class BusinessUnit extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddBusinessUnit} />
                <Route path={`${this.props.match.url}/edit`} component={AddBusinessUnit} />
                <Route path='*' component={NotFound} />
            </Switch>
        )
    }
}

export default BusinessUnit