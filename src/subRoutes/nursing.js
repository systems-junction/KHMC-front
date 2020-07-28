import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import addEditNursing from '../views/RCM/ServiceManagement/Nursing/addEditNursing'
import Nursing from '../views/RCM/ServiceManagement/Nursing/nursing'
class PurchaseRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={Nursing} />
        <Route
          path={`${this.props.match.url}/add`}
          component={addEditNursing}
        />
        <Route
          path={`${this.props.match.url}/edit`}
          component={addEditNursing}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}
export default PurchaseRequest