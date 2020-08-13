/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import servicesDischargeRequest from "../views/ServicesRequest/DischargeRequest/servicesDischargeRequest";
import dischargeRequestTable from "../views/ServicesRequest/DischargeRequest/dischargeRequestTable";

import viewEDR from "../views/EDR/viewEDR";
import addEditEDR from "../views/EDR/addEditEDR";
import TriageAndAssessment from "../views/EDR/TriageAndAssessment";
import DischargeRequest from "../views/EDR/DischargeRequest";
import addDischargeMed from "../views/EDR/addDischargeMed";

class EmergencyDR extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={dischargeRequestTable}
        />

        <Route
          exact
          path={`${this.props.match.url}/view`}
          component={servicesDischargeRequest}
        />

        {/* <Route
          path={`${this.props.match.url}/viewEDR/add`}
          component={addEditEDR}
        />

        <Route
          path={`${this.props.match.url}/viewEDR/TriageAndAssessment`}
          component={TriageAndAssessment}
        />

        <Route
          path={`${this.props.match.url}/viewEDR/DischargeRequest`}
          component={DischargeRequest}
        />

        <Route
          path={`${this.props.match.url}/viewEDR/addDischargeRequest`}
          component={addDischargeMed}
        /> */}

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default EmergencyDR;
