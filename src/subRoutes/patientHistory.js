/* eslint-disable react/jsx-indent */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import patientHistory from "../views/PatientHistory/PatientHistoryWithSearch";
import LabRadReport from "../components/ViewLabRadReport/ViewLabRadReport";

class PatientHistory extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={patientHistory}
        />

        <Route
          exact
          path={`${this.props.match.url}/viewReport`}
          component={LabRadReport}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PatientHistory;
