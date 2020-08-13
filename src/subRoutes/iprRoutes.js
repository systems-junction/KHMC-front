/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import ipr from "../views/IPR/IPR";
import viewIPR from "../views/IPR/viewIPR";
import addEditIPR from "../views/IPR/addEditIPR";
import TriageAndAssessment from "../views/IPR/TriageAndAssessment";
import DischargeRequest from "../views/IPR/DischargeRequest";
import addDischargeMed from "../views/IPR/addDischargeMed";

class IPR extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={ipr} />

        <Route
          exact
          path={`${this.props.match.url}/viewIPR`}
          component={viewIPR}
        />

        <Route
          path={`${this.props.match.url}/viewIPR/add`}
          component={addEditIPR}
        />

        <Route
          path={`${this.props.match.url}/viewIPR/TriageAndAssessment`}
          component={TriageAndAssessment}
        />
        <Route
          path={`${this.props.match.url}/viewIPR/DischargeRequest`}
          component={DischargeRequest}
        />

        <Route
          path={`${this.props.match.url}/viewIPR/addDischargeRequest`}
          component={addDischargeMed}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default IPR;
