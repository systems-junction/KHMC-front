/* eslint-disable react/jsx-indent */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import reimbursement from '../views/InsuranceClaim/Reimbursement/reImbursement'
import submitClaim from '../views/InsuranceClaim/Reimbursement/submitClaim'
// import needApproval from '../views/InsuranceClaim/PreApproval/needApproval'
// import followUp from '../views/InsuranceClaim/PreApproval/followUp'

class reImbursement extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={reimbursement} />

        <Route
          exact
          path={`${this.props.match.url}/submitClaim`}
          component={submitClaim}
        />

        {/* <Route
          path={`${this.props.match.url}/viewPreApproval/needApproval`}
          component={needApproval}
        />

        <Route
          path={`${this.props.match.url}/viewPreApproval/followUp`}
          component={followUp}
        /> */}

        
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default reImbursement
