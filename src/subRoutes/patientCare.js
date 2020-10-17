import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import patientCare from "../views/PatientAssessmentCareLabRad/PatientAssessmentCareLabRad";
import PatientHistory from "../views/PatientHistory/PatientHistory";
import triageAssessment from "../views/TriageAndAssessment/TriageAndAssessment";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";
import viewReport from "../components/ViewLabRadReport/ViewLabRadReport";

class PatientCare extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={patientCare} />
        <Route
          path={`${this.props.match.url}/triageAssessment`}
          component={triageAssessment}
        />
        <Route
          path={`${this.props.match.url}/patienthistory`}
          component={PatientHistory}
        />
        <Route
          path={`${this.props.match.url}/patienthistory/viewReport`}
          component={viewReport}
        />

        <Route
          path={`${this.props.match.url}/viewReport`}
          component={viewReport}
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

export default PatientCare;
