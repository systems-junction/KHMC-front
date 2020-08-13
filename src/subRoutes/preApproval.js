/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import preApproval from '../views/InsuranceClaim/PreApproval/preApproval'
import viewPreApproval from '../views/InsuranceClaim/PreApproval/viewPreApproval'
import needApproval from '../views/InsuranceClaim/PreApproval/needApproval'
import followUp from '../views/InsuranceClaim/PreApproval/followUp'

class PreApproval extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={preApproval} />

        <Route
          exact
          path={`${this.props.match.url}/viewPreApproval`}
          component={viewPreApproval}
        />

        <Route
          path={`${this.props.match.url}/viewPreApproval/needApproval`}
          component={needApproval}
        />

        <Route
          path={`${this.props.match.url}/viewPreApproval/followUp`}
          component={followUp}
        />

        
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default PreApproval
