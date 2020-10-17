import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import patientAssessment from "../views/PatientAssessment/patientAssessment";
import triageAssessment from "../components/TriageAndAssessment/TriageAndAssessment";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";
import viewReport from "../components/ViewLabRadReport/ViewLabRadReport";
import pviewReport from "../views/PatientAssessment/viewLabRadReport";
import PatientHistory from "../components/PatientHistory/PatientHistory";

class PatientAssessment extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={patientAssessment}
        />
        <Route
          path={`${this.props.match.url}/triageAssessment`}
          component={triageAssessment}
        />

        <Route
          path={`${this.props.match.url}/patienthistory`}
          component={PatientHistory}
        />

        <Route
          path={`${this.props.match.url}/viewReport`}
          component={viewReport}
        />

        <Route
          path={`${this.props.match.url}/viewReport`}
          component={pviewReport}
        />
        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default PatientAssessment;
